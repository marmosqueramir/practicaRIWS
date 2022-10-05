import scrapy
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from footballCrawler.items import FootballScoreItem


class FootballScoresSpider(CrawlSpider):
    name = 'footballScores'
    # Para que nn se salga de esta pagina si encontra enlaces a outra web.
    allowed_domains = ['www.resultados-futbol.com']
    # URLs para scrapear
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1']

    rules = {
        Rule(LinkExtractor(allow=(), restrict_xpaths=('//div[@id="col-resultados"]/div[@class="boxtop cleartop"]/div[@class="bar_jornada"]/div[@class="right journey-simple"]/div[@class="j_sig"]/a'))),
        Rule(LinkExtractor(allow=(), restrict_xpaths=('//table[@id="tabla1"]/tbody/tr[@class="vevent "]/td[@class="rstd"]/a')), callback="parse_item", follow=False),
        Rule(LinkExtractor(allow=(), restrict_xpaths=('//table[@id="tabla1"]/tbody/tr[@class="vevent impar"]/td[@class="rstd"]/a')), callback="parse_item", follow=False),
    }

    def parse_item(self, response):
        match_item = FootballScoreItem()
        match_item['homeTeam']= response.xpath('//div[@class="team equipo1"]//b[@itemprop="name"]/text()').extract()
        #match_item['homeTeam'] = response.xpath('//*[@id="tabla1"]/tbody/tr[1]/td[3]/a[2]').extract()
        yield match_item
