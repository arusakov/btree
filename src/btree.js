/**
 * Classic comporator function
 * @callback Comporator
 * @param left
 * @param right
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
  * @property {Object} values
  * @property {Node[]} childs
  */

/**
 * @class
 * @param {BTreeOptions} options
 */
function BTree(options) {
  this.options = option;
  this.node = createNode();
}

BTree.prototype = {
  /**
   * Delete element from BTree
   * @param {Object} element or element like object
   */
  delete: function _delete(elementLike) {

  },
  /**
   * Insert element to BTree
   * @param {Object} element
   */
  insert: function set(element) {

  },
  values: function values() {

  }
};

/**
 * @return {BTreeNode}
 */
function createNode() {
  return {
    childs: [],
    values: []
  };
}

function simpleInsert(node, element, index) {
  var newNode = createNode();
  if (node.values.length === index) { // end
    node.values.push(element);
    node.childs.push(newNode);
  } else if (index) { // middle
    node.values.splice(index, 0, element);
    node.childs.splice(index, 0, newNode);
  } else { // start
    node.values.unshift(element);
    node.childs.unshift(newNode);
  }
}

exports.BTree = BTree;
exports.createNode = createNode;
exports.simpleInsert = simpleInsert;
