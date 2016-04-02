/* global require, describe, it */

var should = require('should');

var btree = require('..');

var BTree = btree.BTree;
var createNode = btree.createNode;
var insertToArr = btree.insertToArr;
var sliceNode = btree.sliceNode;

describe('BTree', () => {

  it('toArray() empty', () => {
    new BTree().toArray().should.deepEqual([]);
  });

  it('insertRec() completed leaf', () => {
    var bt = new BTree({
      comparator: (a, b) => a - b,
      degree: 3
    });
    should(bt.insertRec(bt.root, 1)).be.null();
    bt.toArray().should.be.eql([1]);
    should(bt.insertRec(bt.root, 2)).be.null();
    bt.toArray().should.be.eql([1, 2]);
    should(bt.insertRec(bt.root, 3)).be.eql(
      sliceNode(createNode([1, 2, 3], null))
    );
  });

  it('insertRec() order', () => {
    var bt = new BTree({
      comparator: (a, b) => a - b,
      degree: 10
    });
    bt.insertRec(bt.root, 1);
    bt.insertRec(bt.root, -1);
    bt.insertRec(bt.root, 3);
    bt.insertRec(bt.root, 2);
    bt.insertRec(bt.root, 100);
    bt.insertRec(bt.root, 50);
    bt.insertRec(bt.root, -50);

    bt.toArray().should.be.eql([
      -50, -1, 1, 2, 3, 50, 100
    ]);
  });

  it('insert()', () => {
    var bt = new BTree({
      degree: 3,
      comparator: (a, b) => a - b
    });

    bt.insert(1);
    bt.insert(2);
    bt.insert(3);
    bt.insert(4);
    bt.insert(5);
    bt.insert(6);
    bt.insert(7);

    bt.toArray().should.be.eql([
      1, 2, 3, 4, 5, 6, 7
    ]);
  });

});

describe('Helpers funcs', () => {

  it('createNode()', () => {
    createNode([1], [2]).should.eql({
      childs: [2],
      values: [1]
    });
  });

  it('insertToArr()', () => {
    var arr = [];

    insertToArr(arr, 3, 0);
    arr.should.eql([3]);

    insertToArr(arr, 1, 0);
    arr.should.eql([1, 3]);

    insertToArr(arr, 2, 1);
    arr.should.eql([1, 2, 3]);
  });

  it('sliceNode() no childs', () => {
    var node = createNode(
      [10, 20, 30], null
    );

    sliceNode(node).should.be.eql({
      lNode: createNode([10], null),
      middle: 20,
      rNode: createNode([30], null)
    });
  });

  it('sliceNode() odd', () => {
    var node = createNode(
      [10, 20, 30],
      [5, 15, 25, 35]
    );

    sliceNode(node).should.eql({
      lNode: createNode([10], [5, 15]),
      middle: 20,
      rNode: createNode([30], [25, 35])
    });
  });

  it('sliceNode() even', () => {
    var node = createNode(
      [10, 20, 30, 40],
      [5, 15, 25, 35, 45]
    );

    sliceNode(node).should.eql({
      lNode: createNode([10, 20], [5, 15, 25]),
      middle: 30,
      rNode: createNode([40], [35, 45])
    });
  });

});
