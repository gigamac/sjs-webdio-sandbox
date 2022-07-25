import { fastify } from 'fastify';
import { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';
import { createMock } from 'ts-auto-mock';
import _ from 'lodash';

const server = fastify({
    logger: true,
});


server.register(cookie, {} as FastifyCookieOptions);

server.get('/mockpage', async(req: any, reply: { header: (arg0: string, arg1: string) => void; send: (arg0: string) => void; }) => {
    reply.header('Content-Type','text/html');
    reply.header('cookies','sessionId=128ue9qhw8dgqw8');
    const html = `<!DOCTYPE html><html>
	<head>
    <script type="text/javascript" id="mealScript">
    window.foodieObject = {
        menu: {
            carbs: "gnocci",
            prots: "butterbeans",
            veg: "broccoli"
        },
        scorecard:{
            foodGroups: 3,
            sophisticationOfTen: 1,
            healthOfTen: 8,
            customerRatingAvOfTen: 7
        }
    }
    </script>
    <script type="text/javascript" id="customerScript">
        window.customer = {
            age: 35,
            typeOfEater: "healthy",
            dateOfVisit: "2022-04-08",
            timeAtTable: "01:30",
            returnCustom: true,
            averageRatingOverall: 8,
            ratings:[
                visit = {
                    date: 2022-04-08,
                    overallOfTen: 8,
                    serviceRatingOfTen: 8,
                    Meal: {
                        starterOfTen: -1,
                        mainOfTen: 8,
                        aftersOfTen: -1
                    }
                }
            ]
        }
    </script></head>
	<body>
		<div>hello world!</div>
	</body>
</html>`;
reply.send(html);
    // return html;
  });


server.listen(9005, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
});
