/* global exports */

/**
 * Classic comporator function
 * @callback Comporator
 * @param {*} left
 * @param {*} right
 * @return {number} - <0, 0 or >0
 */

/**
 * Options object for BTree object
 * @typedef {Object} BTreeOptions
 * @property {number} degree
 * @property {Comporator} comparator
 */

/**
 * BTree Node Element
 * @typedef {Object} BTreeNode
 * @property {Array<*>} values
 * @property {Node[]} childs
 */

/**
 * @class
 * @param {BTreeOptions} options
 */
function BTree(options) {
  this.options = options;
  this.root = createNode();
}

BTree.prototype = {
  /**
   * Delete element from BTree
   * @param {*} element or element like object
   */
  delete: function _delete(elementLike) {

  },
  /**
   * Insert element to BTree
   * @param {*} element
   */
  insert: function insert(element) {

  },
  /**
   * @private
   * @param {BTreeNode} node
   * @param {*} node
   * @return {boolean}
   */
  insertRec: function insertRec(node, element) {
    var childs = node.childs;
    var values = node.values;
    var completed = values.length + 1 === this.options.degree;

    if (!childs && completed) {
      return false;
    }

    var comp = this.options.comparator;
    var vi = 0;
    for (; vi < values.length; ++vi) {
      if (comp(values) < 0) {
        if (childs) {
          if (!this.insertRec(childs[vi], element)) {
            if (completed) {
              return false;
            }
            var parts = sliceNode(childs[vi]);
            // todo

            return true;
          }
        }
        insertToArr(values, element, vi);
        return true;
      }
    }
    if (childs) {
      if (!this.insertRec(childs[vi], element)) {
        if (completed) {
          return false;
        }

        return true;
      }
    }
    insertToArr(values, element, vi);
    return true;
  },
  toArray: function toArray() {
    var arr = [];
    toArrayRec(this.root, arr);
    return arr;
  },
  values: function values() {

  }
};

/**
 * @return {BTreeNode}
 */
function createNode(values, childs) {
  return {
    childs: childs,
    values: values
  };
}

function insertToArr(arr, element, index) {
  if (arr.length === index) { // end
    arr.push(element);
  } else if (index) { // middle
    arr.splice(index, 0, element);
  } else { // start
    arr.unshift(element);
  }
}

function sliceNode(node) {
  var values = node.values;
  var middleInd = values.length >>> 1;
  var middleNextInd = middleInd + 1;
  var childs = node.childs;

  var lChilds = null;
  var rChilds = null;
  if (childs) {
    lChilds = childs.slice(0, middleNextInd);
    rChilds = childs.slice(middleNextInd);
  }

  return {
    lNode: createNode(values.slice(0, middleInd), lChilds),
    middle: values[middleInd],
    rNode: createNode(values.slice(middleNextInd), rChilds)
  };
}

function toArrayRec(node, arr) {
  var childs = node.childs;
  if (!childs.length) {
    arr.push.apply(arr, node.values);
    return;
  }
  for (var i = 1; i < childs.length; ++i) {
    toArrayRec(childs[i], arr);
    arr.push(node.values[i - 1]);
  }
}

exports.BTree = BTree;
exports.createNode = createNode;
exports.insertToArr = insertToArr;
exports.sliceNode = sliceNode;
