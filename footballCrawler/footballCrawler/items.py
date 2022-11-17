import scrapy


class FootballScoreItem(scrapy.Item):
    id = scrapy.Field()
    homeTeam = scrapy.Field()
    homeScore = scrapy.Field()
    homeShield = scrapy.Field()
    awayTeam = scrapy.Field()
    awayScore = scrapy.Field()
    awayShield = scrapy.Field()
    matchDay = scrapy.Field()
    matchSStadium = scrapy.Field()
    matchResult = scrapy.Field()
    league = scrapy.Field()
    journey = scrapy.Field()
    referee = scrapy.Field()

class FootballPlayer(scrapy.Item):
    id = scrapy.Field()
    ranking = scrapy.Field()
    name = scrapy.Field()
    goals = scrapy.Field()
    position = scrapy.Field()
    teamName = scrapy.Field()
    league = scrapy.Field()
