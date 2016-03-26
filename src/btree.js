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

function BTree(options) {
  this.options = option;
  this.node = createNode();
}

BTree.prototype = {
  /**
   * @param {Object} element
   */
  insert: function set(element) {

  },
  delete: function delete() {

  }
};

/**
 * @return {BTreeNode}
 */
function createNode() {
  return {
    childs: [],
    values: []
  }
}
