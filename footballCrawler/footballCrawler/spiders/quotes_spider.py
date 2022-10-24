import scrapy
from footballCrawler.items import FootballScoreItem


class AuthorSpider(scrapy.Spider):
    name = 'matchpoints'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1']

    def parse(self, response):
        matchpoints_page_links = response.css('tr.vevent td.rstd a')
        yield from response.follow_all(matchpoints_page_links, self.parse_author)

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
