require('dotenv').config({ path: '.env.test' });

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const Product = require('../product');

const mongoose = require('mongoose');


chai.use(chaiHttp);




describe('Test', () => {



let token;

before((done) => {
  const User = require('../user'); // adapte le chemin selon ton projet
  const bcrypt = require('bcryptjs');

  // Créer un utilisateur manuellement
  const newUser = new User({
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10), // mot de passe haché
    role: "admin" // ou autre selon ton modèle
  });

  newUser.save().then(() => {
    chai.request(server)
      .post('/api/auth/login')
      .send({ email: "test@example.com", password: "123456" })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  }).catch(done);
});



it('should POST a valid product', (done) => {
        
    let product = {
        name: "Test Product",
        price: 100,
        quantity: 20
    }
    chai.request(server)
    .post('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .send(product)
    .end((err, res) => {
        res.should.have.status(201);
        
        done();

    });

});

});