const assert = require('assert');
const sinon = require('sinon');
const { User } = require("../models");
const authModule = require('../authModule');

describe('Authentication Module', () => {
  describe('getSingleUser', () => {
    it('should return a user if found', async () => {
      const req = { user: { _id: '123' }, params: { username: 'testuser' } };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis()
      };
      const findOneStub = sinon.stub(User, 'findOne').resolves({ _id: '123', username: 'testuser' });

      await authModule.getSingleUser(req, res);

      sinon.assert.calledWith(res.json, { _id: '123', username: 'testuser' });
      findOneStub.restore();
    });

    it('should return a 400 error if user is not found', async () => {
      const req = { user: { _id: '123' }, params: { username: 'testuser' } };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis()
      };
      const findOneStub = sinon.stub(User, 'findOne').resolves(null);

      await authModule.getSingleUser(req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: 'Cannot find a user with this id!' });
      findOneStub.restore();
    });

    it('should return a 500 error if an exception occurs', async () => {
      const req = { user: { _id: '123' }, params: { username: 'testuser' } };
      const res = {
        json: sinon.stub(),
        status: sinon.stub().returnsThis()
      };
      const findOneStub = sinon.stub(User, 'findOne').rejects(new Error('Test Error'));

      await authModule.getSingleUser(req, res);

      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { message: 'Server Error' });
      findOneStub.restore();
    });
  });


});
