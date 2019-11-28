//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Incident = require('../models/incidentModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Incidents', () => {
    beforeEach((done) => { //Before each test we empty the database
        Incident.deleteOne({}, (err) => { 
           done();           
        });        
    });

    describe('/GET Incidents', () => {
        it('it should GET all the incidents', (done) => {
        chai.request(server)
            .get('/api/incidents')
            .end((err, res) => {
                    res.should.have.status(200);
                    var incidents = res.body.incidents;
                    incidents.should.be.a('array');
                    incidents.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/Post Incident', () => {
        it('it should insert the new incident', (done) => {
            chai.request(server)
                .post('/api/incidents')
                .send({name:'testIncident1', severity: 'major'})
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.be.eql(true);                    
            });

            chai.request(server)
                .get('/api/incidents')
                .end((err, res) => {
                    res.should.have.status(200);
                    var incidents = res.body.incidents;
                    var found = incidents.find(element=> element.name === 'testIncident1');
                    found.should.be.a('object');
                    found.should.have.property('severity').eql('major');
                    
                    chai.request(server)
                        .get('/api/incidents/find/' + found.id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            var incident = res.body.data;
                            incident.should.be.a('object');
                        });                    
                done();
            });
        });
    });

    describe('/Put Incident', () => {
        it('it should update the incident', (done) => {
            chai.request(server)
                .post('/api/incidents')
                .send({name:'testIncident1', severity: 'major'})
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.be.eql(true);                    
            });

            chai.request(server)
                .get('/api/incidents')
                .end((err, res) => {
                    res.should.have.status(200);
                    var incidents = res.body.incidents;
                    var found = incidents.find(element=> element.name === 'testIncident1');
                    found.should.be.a('object');
                    found.should.have.property('severity').eql('major');
                    
                    chai.request(server)
                        .put('/api/incidents/update/')
                        .send({id: found.id, update: { name:'testIncident2', severity: 'minor'}})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.success.should.be.eql(true);
                    });

                    chai.request(server)
                        .get('/api/incidents/find/' + found.id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            var incident = res.body.data;
                            incident.should.be.a('object');
                            incident.should.have.property('severity').eql('minor');
                            incident.should.have.property('name').eql('testIncident2');
                    });
                done();
            });
        });
    });

    describe('/Delete Incident', () => {
        it('it should delete the incident', (done) => {
            chai.request(server)
                .post('/api/incidents')
                .send({name:'testIncident1', severity: 'major'})
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.be.eql(true);                    
            });

            chai.request(server)
                .get('/api/incidents')
                .end((err, res) => {
                    res.should.have.status(200);
                    var incidents = res.body.incidents;
                    var found = incidents.find(element=> element.name === 'testIncident1');
                    found.should.be.a('object');
                    found.should.have.property('severity').eql('major');
                    
                    chai.request(server)
                        .delete('/api/incidents/delete')
                        .send({id: found.id})
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.success.should.be.eql(true);
                    });

                    chai.request(server)
                        .get('/api/incidents')
                        .end((err, res) => {
                            res.should.have.status(200);
                            var incidents = res.body.incidents;
                            incidents.should.be.a('array');
                            incidents.length.should.be.eql(0);
                    });
                done();
            });
        });
    });
});