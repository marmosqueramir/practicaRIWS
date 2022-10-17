# import scrapy


# class QuotesSpider(scrapy.Spider):
#     name = "quotes"
#     start_urls = [
#         'https://quotes.toscrape.com/page/1/',
#         'https://quotes.toscrape.com/page/2/',
#     ]

#     def parse(self, response):
#         for quote in response.css('div.quote'):
#             yield {
#                 'text': quote.css('span.text::text').get(),
#                 'author': quote.css('small.author::text').get(),
#                 'tags': quote.css('div.tags a.tag::text').getall(),
#             }
            
import scrapy


class AuthorSpider(scrapy.Spider):
    name = 'matchpoints'
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1']

    def parse(self, response):
        matchpoints_page_links = response.css('tr.vevent td.rstd a')
        yield from response.follow_all(matchpoints_page_links, self.parse_author)

        pagination_links = response.css('div.j_sig a')
        yield from response.follow_all(pagination_links, self.parse)

    def parse_author(self, response):
        def extract_with_css(query):
            return response.css(query).getall()

        yield {
            'matchResult': extract_with_css('.claseR::text'),
            #'birthdate': extract_with_css('.author-born-date::text'),
            #'bio': extract_with_css('.author-description::text'),
        }