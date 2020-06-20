'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  if (!century) {
    const ages = people
      .filter(person => person.sex === 'm')
      .map(person => person.died - person.born);
    const sumAges = ages.reduce((accum, value) => accum + value, 0);

    return sumAges / ages.length;
  }

  const agesWithCerntury = people
    .filter(person => Math
      .ceil(person.died / 100) === century && person.sex === 'm')
    .map(person => person.died - person.born);
  const sumAgesWithCentury = agesWithCerntury
    .reduce((accum, value) => accum + value, 0);

  return sumAgesWithCentury / agesWithCerntury.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  if (!withChildren) {
    const ages = people
      .filter(person => person.sex === 'f')
      .map(person => person.died - person.born);
    const sumAges = ages.reduce((accum, value) => accum + value, 0);

    return sumAges / ages.length;
  }

  const womenAgeWithChildrens = people
    .filter(person => (
      person.sex === 'f' && people.some(child => child.mother === person.name
      )))
    .map(person => person.died - person.born);
  const sumWomenAgeWithChildrens = womenAgeWithChildrens
    .reduce((accum, value) => accum + value, 0);

  return sumWomenAgeWithChildrens / womenAgeWithChildrens.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  function motherFinder(child) {
    const findMother = people.filter(mom => mom.name === child.mother);

    return ((findMother.map(childMother => childMother.born))[0]);
  }

  const updatedPeople = people.map(child => {
    return {
      ...child,
      motherAge: motherFinder(child),
    };
  });

  const childWithKnownMother = (onlyWithSon)
    ? updatedPeople
      .filter(
        child => child.motherAge !== undefined && child.sex === 'm'
      )
    : updatedPeople
      .filter(
        child => (
          child.motherAge !== undefined
        ));
  const ageDifference = childWithKnownMother
    .reduce(
      (sum, child) => child.born - child.motherAge + sum, 0
    );

  return ageDifference / childWithKnownMother.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
