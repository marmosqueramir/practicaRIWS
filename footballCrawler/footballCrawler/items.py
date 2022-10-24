import scrapy


class FootballScoreItem(scrapy.Item):
    homeTeam = scrapy.Field()
    homeScore = scrapy.Field()
    homeShield = scrapy.Field()
    awayTeam = scrapy.Field()
    awayScore = scrapy.Field()
    awayShield = scrapy.Field()
    matchDay = scrapy.Field()
    matchSStadium = scrapy.Field()
    matchResult = scrapy.Field()

class TutorialItemChampions(scrapy.Item):
    homeTeam = scrapy.Field()
    homeScore = scrapy.Field()
    homeShield = scrapy.Field()
    awayTeam = scrapy.Field()
    awayScore = scrapy.Field()
    awayShield = scrapy.Field()
    matchDay = scrapy.Field()
    matchSStadium = scrapy.Field()
    matchResult = scrapy.Field()