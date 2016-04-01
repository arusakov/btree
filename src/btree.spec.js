/* global require, describe, it */

require('should');

var btree = require('./btree');

var BTree = btree.BTree;
var createNode = btree.createNode;
var insertToArr = btree.insertToArr;
var sliceNode = btree.sliceNode;

describe('Helpers funcs', () => {

  it('createNode()', () => {
    createNode([1], [2]).should.deepEqual({
      childs: [2],
      values: [1]
    });
  });

  it('insertToArr()', () => {
    var arr = [];

    insertToArr(arr, 3, 0);
    arr.should.deepEqual([3]);

    insertToArr(arr, 1, 0);
    arr.should.deepEqual([1, 3]);

    insertToArr(arr, 2, 1);
    arr.should.deepEqual([1, 2, 3]);
  });

  it('sliceNode() odd', () => {
    var node = createNode(
      [10, 20, 30],
      [5, 15, 25, 35]
    );

    sliceNode(node).should.deepEqual({
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

    sliceNode(node).should.deepEqual({
      lNode: createNode([10, 20], [5, 15, 25]),
      middle: 30,
      rNode: createNode([40], [35, 45])
    });
  });

});
