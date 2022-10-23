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
    #spider name. Use this name to call scrapy crawl. it must be unique
    name = 'matchpoints'
    #atributo que generara las request a las urls
    start_urls = ['https://www.resultados-futbol.com/primera/grupo1/jornada1']

    #metodo que sera llamado para menejar cada una de las requests para las anteriores urls. Aunque no le digamos a scrapy que lo haga. Porque para scrapy el parse() es el metodo por defecto de callback(donde se llamaria a parse para cada url o request de la url)
    
    def parse(self, response):
        #con esta primera linea voy al link donde esta el resultado del partido
        matchpoints_page_links = response.css('tr.vevent td.rstd a')
        #con el follow_all pillo todos los links de la tabla(iterator)
        #le paso el link al parse_author
        yield from response.follow_all(matchpoints_page_links, self.parse_author)

        #obtengo el elemento donde esta el link:<a></a>
        pagination_links = response.css('div.j_sig a')
        #con el follow_all pillamos el href de ese elemento </a>
            #y generamos otra response con la nueva url con la que se llamara
                #otra vez al parse method
        yield from response.follow_all(pagination_links, self.parse)
        #yield from: encadenar generadores
    def parse_author(self, response):
        #metodo para sacar el objeto donde estara el resultado del partido
            #al cual se llamara en el yield para que salga por pantalla
        #aqui ya esta en la url pinchada desde el resultado. Por ejemplo: https://www.resultados-futbol.com/partido/Osasuna/Sevilla
        def extract_with_css(query):
            #utilizo getAll para devolver la lista con los dos resultados
                #local - visitante
                #para conseguir uno de los dos vale con [0]
            return response.css(query).getall()

        yield {
            'matchResult': extract_with_css('.claseR::text'),
            #'birthdate': extract_with_css('.author-born-date::text'),
            #'bio': extract_with_css('.author-description::text'),
        }

#scrapy filtra las urls que sean iguales evitando llamadas innecesarias
