"use strict";

const path = require("path");
const expect = require("chai").expect;

const SuperSet = require(path.join(__dirname, "..", "index.js"));

describe("SuperSet", () => {
    let testSet, otherSetObj;

    beforeEach(() => {
        testSet = new SuperSet([1, 2, 3]);
        otherSetObj = new SuperSet([2, 3, 4, 5]);
    });

    describe("map", () => {
        it("should apply the transform function to all elements and return a new set", () => {
            const result = testSet.map(elem => elem * elem);

            expect(Array.from(result)).to.eql([1, 4, 9]);
        });
    });

    describe("union", () => {
        it("should return elements in both sets", () => {
            const result = testSet.union(otherSetObj);

            expect(Array.from(result)).to.eql([1, 2, 3, 4, 5]);
        });
    });

    describe("every", () => {
        it("should return false if any of the elements in the set does not satisfy the condition", () => {
            expect(testSet.every(elem => elem > 1)).to.be.false;
        });

        it("should return true if all elements in the set satisfy the condition", () => {
            expect(testSet.every(elem => elem >= 1)).to.be.true;
        });

        it("should return false if no element in the set satisfies the condition", () => {
            expect(testSet.every(elem => elem < 1)).to.be.false;
        });

        it("should return true for empty set", () => {
            expect((new SuperSet()).every(elem => !elem)).to.be.true;
        });
    });

    describe("find", () => {
        it("should return the first element satisfying the condition", () => {
            const result = testSet.find(elem => elem > 1);

            expect(result).to.equal(2);
        });
    });

    describe("join", () => {
        it("should have no separator with an empty set", () => {
            testSet.clear();

            expect(testSet.join("//sep//")).to.equal("");
        });

        it("should have no separator with a set having a single element", () => {
            testSet.clear();
            testSet.add(1);

            expect(testSet.join("//sep//")).to.equal("1");
        });

        it("should join using the separator provided", () => {
            expect(testSet.join("//sep//")).to.equal("1//sep//2//sep//3");
        });

        it("should join using ',' when no separator is provided", () => {
            expect(testSet.join()).to.equal("1,2,3");
        });
    });

    describe("first", () => {
        it("should return the first element", () => {
            testSet.clear();
            testSet.add(Math.PI);

            expect(testSet.first).to.equal(Math.PI);
        });
    });

    describe("reduce", () => {
        it("should reduce the elements using the function", () => {
            const result = testSet.reduce((accumulator, elem) => accumulator + elem);

            expect(result).to.equal(6);
        });
    });

    describe("some", () => {
        it("should return true if any of the elements in the set satisfies the condition", () => {
            expect(testSet.some(elem => elem === 2)).to.be.true;
        });

        it("should return true if more than one element in the set satisfy the condition", () => {
            expect(testSet.some(elem => elem > 1)).to.be.true;
        });

        it("should return false if no element in the set satisfies the condition", () => {
            expect(testSet.some(elem => elem < 1)).to.be.false;
        });

        it("should return false for empty set", () => {
            expect((new SuperSet()).some(elem => !elem)).to.be.false;
        });
    });

    describe("isSubsetOf", () => {
        it("should return false when other set does not contain all elements of the source", () => {
            expect(testSet.isSubsetOf(otherSetObj)).to.be.false;
        });

        it("should return true for any empty set as the source", () => {
            expect((new SuperSet()).isSubsetOf(testSet)).to.be.true;
        });

        it("should return true for the same set", () => {
            expect(testSet.isSubsetOf(testSet)).to.be.true;
        });

        it("should return true when other set cover the source set", () => {
            otherSetObj.add(1);
            expect(testSet.isSubsetOf(otherSetObj)).to.be.true;
        });
    });

    describe("equals", () => {
        it("should return false for different sets", () => {
            expect(testSet.equals(otherSetObj)).to.be.false;
        });

        it("should return true for equivalent Sets", () => {
            expect(testSet.equals(new Set(testSet))).to.be.true;
        });

        it("should return true for equivalent SuperSets", () => {
            expect(testSet.equals(new SuperSet(testSet))).to.be.true;
        });
    });

    describe("intersect", () => {
        it("should return elements only in both sets", () => {
            const result = testSet.intersect(otherSetObj);

            expect(Array.from(result)).to.eql([2, 3]);
        });
    });

    describe("subtract", () => {
        it("should return elements only in one set", () => {
            const result = testSet.subtract(otherSetObj);

            expect(Array.from(result)).to.eql([1]);
        });
    });

    describe("update", () => {
        it("should add all elements in the iterable", () => {
            testSet.update([1, 2, 3]);

            expect(Array.from(testSet)).to.eql([1, 2, 3]);
        });
    });

    describe("xor", () => {
        it("should return elements only in one set", () => {
            const result = testSet.xor(otherSetObj);

            expect(Array.from(result)).to.eql([1, 4, 5]);
        });
    });
});