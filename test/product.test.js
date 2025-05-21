// test.js
require('dotenv').config({ path: '.env.test' });

process.env.PORT = 5001; // ✅ port différent pour les tests
process.env.NODE_ENV = 'test'; // utile si tu veux des configs isolées

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const should = chai.should();

const server = require('../server'); // ce fichier écoute automatiquement sur le port
const Product = require('../product');

chai.use(chaiHttp);

describe('Test', () => {
    before(async () => {
        // Tu peux ici faire un nettoyage de la base si tu veux
        await Product.deleteMany({});
    });

    it('should POST a valid product', (done) => {
        const product = {
            name: "Test Product",
            price: 100,
            quantity: 20
        };

        chai.request(server)
            .post('/api/products')
            .send(product)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    after(async () => {
        await Product.deleteMany({});
        server.close(); // ✅ on ferme le serveur après les tests
    });
});
