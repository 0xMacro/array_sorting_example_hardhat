// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;


contract ArraySortingExample {

    uint256[] public values;

    constructor(uint256[] memory _values) {
        values = _values;
    }

    // simple function to add a uint256 to the values array
    function push(uint256 value) public {
        values.push(value);
    }

    // removes a value at the given index by shifting
    // all other values over
    function removeSlow(uint256 _index) public {
        require(_index < values.length, "ArraySortingExample: _index is out of bounds");

        // index = 1
        // [1,2,3,4,5,6,7,8,9,10]
        for (uint256 i = _index; i < values.length - 1; i++) {
            values[i] = values[i + 1];
        }
        // [1,3,4,5,6,7,8,9,10]
    }

    function removeFast(uint256 _index) public {
        require(_index < values.length, "ArraySortingExample: _index is out of bounds");

        // index = 1
        // [1,2,3,4,5,6,7,8,9,10]
        values[_index] = values[values.length - 1];
        // [1,10,3,4,5,6,7,8,9,10]
        values.pop();
        // [1,10,3,4,5,6,7,8,9]
    }
}