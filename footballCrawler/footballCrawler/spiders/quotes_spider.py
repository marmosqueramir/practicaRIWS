import scrapy
from footballCrawler.items import FootballScoreItem
from footballCrawler.items import FootballPlayer

class PlayerSpider(scrapy.Spider):
    name = 'players'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1', 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1']

    def parse(self, response):
        league = response.css('div.clearfix div.titular-data h1::text').get()
        for player in response.css("div.gridPlayers tr.fila"):
            football_player = FootballPlayer()
            football_player['ranking'] = player.css('td::text').get()
            football_player['name'] = player.css('td a::text').get()
            football_player['goals'] = player.css('td strong::text').get()
            football_player['position'] = player.css('td.role::text').get()
            football_player['teamName'] = player.css('td.esp a::text').get()
            football_player['league'] = league

            yield football_player
class MatchSpider(scrapy.Spider):
    name = 'matchpoints'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1', 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1']

    def parse(self, response):
        for i in self.start_urls:
            if(i == 'https://www.resultados-futbol.com/primera/grupo1/jornada1'):
                matchpoints_page_links = response.css('tr.vevent td.rstd a')
                yield from response.follow_all(matchpoints_page_links, self.parse_match)

                pagination_links = response.css('div.j_sig a')
                yield from response.follow_all(pagination_links, self.parse)
            if(i == 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1'):
                matchpoints_page_links = response.css('tr.vevent td.rstd a')
                yield from response.follow_all(matchpoints_page_links, self.parse_match)

                pagination_links = response.css('div.j_sig a')
                yield from response.follow_all(pagination_links, self.parse)

    def parse_match(self, response):
        def extract_with_css_team(query):
            if(response.css(query).get() != '-'):
                return response.css(query).get()
        def extract_with_css_away_team_shield_and_score(query):
            lista = []
            lista = response.css(query).getall()
            if(len(lista) > 0 and lista[0] != '-'):
                return response.css(query)[1].get()
            else:
                return None
        def extract_with_css_math_result(query):
            lista = []
            lista = response.css(query).getall()
            if(len(lista) > 0 and lista[0] != '-'):
                return response.css(query).getall()
            else:
                return None
        def extract_with_css_league(query):
            return response.css(query)[1].get()
        def extract_with_css_journey(query):
            return response.css(query).get()

        match_item = FootballScoreItem()
        match_item['homeTeam']= extract_with_css_team('div.performers div.team.equipo1 h2 a b::text')
        match_item['homeScore']= extract_with_css_team('.claseR::text')
        match_item['homeShield']= extract_with_css_team('.team-logo img::attr(src)')

        match_item['awayTeam']= extract_with_css_team('div.performers div.team.equipo2 h2 a b::text')
        match_item['awayScore']= extract_with_css_away_team_shield_and_score('.claseR::text')
        match_item['awayShield']= extract_with_css_away_team_shield_and_score('.team-logo img::attr(src)')

        match_item['matchDay']= extract_with_css_team('div.with_info div.performers span.jor-date::text')
        match_item['matchSStadium']= extract_with_css_team('.stadium b::text')
        match_item['matchResult']= extract_with_css_math_result('.claseR::text')
        match_item['league']= extract_with_css_league('div.microformat.itemscope ul a::text')
        match_item['journey']= extract_with_css_journey('.jornada a::text')
        yield match_item

