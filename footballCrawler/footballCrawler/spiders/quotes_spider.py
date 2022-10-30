import scrapy
from footballCrawler.items import FootballScoreItem
from footballCrawler.items import TutorialItemChampions

class AuthorSpider(scrapy.Spider):
    name = 'matchpoints'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1', 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1']

#para diferenciar entre los partidos jugados y los no jugados:
    #hay que diferenciar entre tr.vevent td.rstd a.url o tr.vevent td.rstd a.hour
        #si la clase de a es url, entonces se jugo
        #si la clase de a es hour, entonces no se jugo y habria que cambiar el parse


    def parse(self, response):
        for i in self.start_urls:
            if(i == 'https://www.resultados-futbol.com/primera/grupo1/jornada1'):
                matchpoints_page_links = response.css('tr.vevent td.rstd a.url')
                yield from response.follow_all(matchpoints_page_links, self.parse_author)

                pagination_links = response.css('div.j_sig a')
                yield from response.follow_all(pagination_links, self.parse)
            if(i == 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1'):
                matchpoints_page_links = response.css('tr.vevent td.rstd a')
                yield from response.follow_all(matchpoints_page_links, self.parse_author_champions)

                pagination_links = response.css('div.j_sig a')
                yield from response.follow_all(pagination_links, self.parse)

    def parse_author(self, response):
        def extract_with_css_home_team(query):
            return response.css(query).get()
        def extract_with_css_away_team(query):
            return response.css(query)[1].get()
        def extract_with_css_math_result(query):
            return response.css(query).getall()
        
        match_item = FootballScoreItem()
        match_item['homeTeam']= extract_with_css_home_team('div.alineaciontitle h3 a::text')
        match_item['homeScore']= extract_with_css_home_team('.claseR::text'),
        match_item['homeShield']= extract_with_css_home_team('.team-logo img::attr(src)'),

        match_item['awayTeam']= extract_with_css_away_team('div.alineaciontitle h3 a::text'),
        match_item['awayScore']= extract_with_css_away_team('.claseR::text'),
        match_item['awayShield']= extract_with_css_away_team('.team-logo img::attr(src)'),

        match_item['matchDay']= extract_with_css_home_team('.report-resume-header tbody tr th b::text'),
        match_item['matchSStadium']= extract_with_css_home_team('.stadium b::text'),
        match_item['matchResult']= extract_with_css_math_result('.claseR::text'),

        yield match_item
    
    def parse_author_champions(self, response):
        def extract_with_css_home_team(query):
            return response.css(query).get()
        def extract_with_css_away_team(query):
            lista = []
            lista = response.css(query).getall()
            if(len(lista) > 0):
                return response.css(query)[1].get()
            else:
                #Hacer otro parse, para los partidos que no se han jugado todavia
                return 'n/a'
        def extract_with_css_math_result(query):
            return response.css(query).getall()
        
        match_item = TutorialItemChampions()
        match_item['homeTeam']= extract_with_css_home_team('div.alineaciontitle h3 a::text')
        match_item['homeScore']= extract_with_css_home_team('.claseR::text'),
        match_item['homeShield']= extract_with_css_home_team('.team-logo img::attr(src)'),

        match_item['awayTeam']= extract_with_css_away_team('div.alineaciontitle h3 a::text'),
        match_item['awayScore']= extract_with_css_away_team('.claseR::text'),
        match_item['awayShield']= extract_with_css_away_team('.team-logo img::attr(src)'),

        match_item['matchDay']= extract_with_css_home_team('.report-resume-header tbody tr th b::text'),
        match_item['matchSStadium']= extract_with_css_home_team('.stadium b::text'),
        match_item['matchResult']= extract_with_css_math_result('.claseR::text'),
        yield match_item

