/* global exports */

/**
 * Classic comparator function
 * @callback Comparator
 * @param {*} left
 * @param {*} right
 * @returns {number} - <0, 0 or >0
 */

/**
 * Options object for BTree object
 * @typedef {Object} BTreeOptions
 * @property {number} degree
 * @property {Comparator} comparator
 */

/**
 * BTree Node Element
 * @typedef {Object} BTreeNode
 * @property {Array<*>} values
 * @property {Node[]} childs
 */

/**
 * @class
 * @param {BTreeOptions} options - options
 */
function BTree(options) {
  this.options = options;
  this.root = createNode([], null);
}

BTree.prototype = {
  /**
   * Delete element from BTree
   * @param {*} elementLike - element or element like object
   * @returns {boolean}
   */
  delete: function _delete(elementLike) {
    // todo
    console.log(elementLike);
    return false;
  },
  /**
   * Insert element to BTree
   * @param {*} element - element
   * @returns {BTree}
   */
  insert: function insert(element) {
    var parts = this.insertRec(this.root, element);
    if (parts) {
      this.root = createNode(
        [parts.middle],
        [parts.lNode, parts.rNode]
      );
    }
    return this;
  },
  /**
   * @private
   * @param {BTreeNode} node parent node
   * @param {*} element
   * @returns {boolean}
   */
  insertRec: function insertRec(node, element) {
    var values = node.values;
    var comparator = this.options.comparator;
    var i = 0;
    while (i < values.length) {
      if (comparator(element, values[i]) < 0) {
        break;
      }
      i += 1;
    }
    if (node.childs) {
      var parts = this.insertRec(node.childs[i], element);
      if (!parts) {
        return parts; // null
      }
      insertToArr(values, parts.middle, i);
      node.childs.splice(i, 1, parts.lNode, parts.rNode);
    } else {
      insertToArr(values, element, i);
    }
    return this.checkNode(node);
  },
  checkNode: function checkNode(node) {
    return node.values.length === this.options.degree ? sliceNode(node) : null;
  },
  /**
   * @private
   * @returns {Array<*>}
   */
  toArray: function toArray() {
    var arr = [];
    toArrayRec(this.root, arr);
    return arr;
  },
  values: function values() {

  }
};

/**
 * @param {Array<*>} values
 * @param {BTreeNode[]} childs
 * @returns {BTreeNode}
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
  if (!childs) {
    arr.push.apply(arr, node.values);
    return;
  }
  toArrayRec(childs[0], arr);
  var values = node.values;
  for (var i = 0; i < values.length; ++i) {
    arr.push(values[i]);
    toArrayRec(childs[i + 1], arr);
  }
}

exports.BTree = BTree;
exports.createNode = createNode;
exports.insertToArr = insertToArr;
exports.sliceNode = sliceNode;
