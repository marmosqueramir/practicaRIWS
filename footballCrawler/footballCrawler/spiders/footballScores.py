import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from footballCrawler.items import FootballScore

class FootballScoresSpider(scrapy.Spider):
    name = 'footballScores'
    # Para que nn se salga de esta pagina si encontra enlaces a outra web.
    allowed_domains = ['www.resultados-futbol.com']
    # URLs para scrapear
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1']

    rules = {
        Rule(LinkExtractor(allow={}, restrict_xpaths={'//*[@id="col-resultados"]/div[1]/div[2]/div[2]/div[3]/a'})),
        Rule(LinkExtractor(allow={}, restrict_xpaths={'//*[@id="col-resultados"]/div[1]/div[2]/div[2]/div[3]/a'})),
    }

    def parse(self, response):
        pass
