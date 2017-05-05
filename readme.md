BTree
=====

[![Greenkeeper badge](https://badges.greenkeeper.io/arusakov/btree.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/arusakov/btree.svg?branch=master)](https://travis-ci.org/arusakov/btree)

In-memory BTree data struct

Usage
-----
```
var tree = new BTree({
  comparator: (a, b) => a - b,
  degree: 10
});

tree.insert(1);
tree.insert(2).insert(3); // chaining

console.log(tree.toArray());
```

Development
-----------
Watch ```scripts``` section of ```package.json```
