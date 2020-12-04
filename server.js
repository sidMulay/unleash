// const unleash = require('unleash-server');
const unleash = require('./lib/server-impl.js');

// You typically will not hard-code this value in your code!
const sharedSecret = 'dev_test_haptik123';

unleash
    .start({
        enableLegacyRoutes: false,
        preRouterHook: app => {
            app.use('/api/client', (req, res, next) => {
                if (req.header('authorization') === sharedSecret) {
                    next();
                } else {
                    res.sendStatus(401);
                }
            });
        },
    })
    .then(server => {
        // eslint-disable-next-line no-console
        console.log(
            `Unleash started on http://localhost:${server.app.get('port')}`,
        );
    });
