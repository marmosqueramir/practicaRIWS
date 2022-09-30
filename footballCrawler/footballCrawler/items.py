import scrapy


class FootballScore(scrapy.Item):
    homeTeam = scrapy.Field()
    homeScore = scrapy.Field()
    homeShield = scrapy.Field()
    awayTeam = scrapy.Field()
    awayScore = scrapy.Field()
    awayShield = scrapy.Field()
    matchDay = scrapy.Field()
