require('should');

var btree = require('./btree');

var BTree = btree.BTree;
var createNode = btree.createNode;
var simpleInsert = btree.simpleInsert;

describe('BTree.insert()', () => {

});

describe('Helpers funcs', () => {

  it('createNode()', () => {
    createNode().should.deepEqual({
      childs: [],
      values: []
    });
  });

  it('simpleInsert()', () => {
    var node = createNode();

    simpleInsert(node, 3, 0);
    node.should.deepEqual({
      childs: [createNode()],
      values: [3]
    });

    simpleInsert(node, 1, 0);
    node.should.deepEqual({
      childs: [createNode(), createNode()],
      values: [1, 3]
    });

    simpleInsert(node, 2, 1);
    node.should.deepEqual({
      childs: [createNode(), createNode(), createNode()],
      values: [1, 2, 3]
    });
  });

});
