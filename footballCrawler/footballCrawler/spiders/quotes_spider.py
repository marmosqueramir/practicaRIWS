import scrapy
from footballCrawler.items import FootballScoreItem
from footballCrawler.items import FootballPlayer
from elasticsearch import Elasticsearch
from elasticsearch.serializer import JSONSerializer
from scrapy.utils.serialize import ScrapyJSONEncoder
#http://localhost:9200/matchplayer/_search?from=0&size=50
#http://localhost:9200/match/_search?from=0&size=200
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'use_ssl': False}], http_auth=('elastic', 'elastic'), timeout=300)
_encoder = ScrapyJSONEncoder()

mapping_match = {
    "mappings": {
        "properties": {
            "id": {"type": "text"},
            "homeTeam": {"type": "text"},
            "homeScore": {"type": "text"},
            "homeShield": {"type": "text"},
            "awayTeam": {"type": "text"},
            "awayScore": {"type": "text"},
            "awayShield": {"type": "text"},
            "matchDay": {"type": "text"},
            "matchSStadium": {"type": "text"},
            "league": {"type": "text"},
            "journey": {"type": "text"}
        }
    }
}
mapping_player = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 2
    },
    "mappings": {
        "properties": {
            "id": {"type": "text"},
            "ranking": {"type": "text"},
            "name": {"type": "text"},
            "goals": {"type": "text"},
            "position": {"type": "text"},
            "teamName": {"type": "text"},
            "league": {"type": "text"}
        }
    }
}
cont = 0
contMatch = 0
es.indices.delete(index='matchplayer', ignore=[400, 404])
es.indices.create(index = 'matchplayer', body = mapping_player)
es.delete_by_query(index='matchplayer', body={"query": {"match_all": {}}})

es.indices.delete(index='match', ignore=[400, 404])
es.indices.create(index = 'match', body = mapping_match)
es.delete_by_query(index='match', body={"query": {"match_all": {}}})
def limpiar_acentos(text):
	acentos = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'E': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'}
	for acen in acentos:
		if acen in text:
			text = text.replace(acen, acentos[acen])
	return text

class PlayerSpider(scrapy.Spider):
    name = 'players'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1', 'https://www.resultados-futbol.com/primera_division_rfef/grupo1/jornada1']

    def parse(self, response):
        global cont
        league = response.css('div.clearfix div.titular-data h1::text').get()
        for player in response.css("div.gridPlayers tr.fila"):
            football_player = FootballPlayer()
            #other option
            doc =  {
                'id': str(cont),
                'ranking' : player.css('td::text').get(),
                'name' : player.css('td a::text').get(),
                'goals' : player.css('td strong::text').get(),
                'position' : player.css('td.role::text').get(),
                'teamName' : player.css('td.esp a::text').get(),
                'league' : league
            }
            football_player['id'] = cont
            football_player['ranking'] = player.css('td::text').get()
            football_player['name'] = limpiar_acentos(player.css('td a::text').get())
            football_player['goals'] = player.css('td strong::text').get()
            football_player['position'] = player.css('td.role::text').get()
            football_player['teamName'] = limpiar_acentos(player.css('td.esp a::text').get())
            football_player['league'] = limpiar_acentos(league)
            cont=cont+1

            #yield football_player
            res = es.index(index='matchplayer', document=_encoder.encode(football_player), id=football_player['id'])
            print(res['result'])

class MatchSpider(scrapy.Spider):
    contMatch = 0
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
        global contMatch
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
        match_item['id'] = contMatch
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

