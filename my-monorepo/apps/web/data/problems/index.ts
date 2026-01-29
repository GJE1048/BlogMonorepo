import { twoSumProblem } from './001-two-sum';
import { debounceProblem } from './002-debounce';
import { throttleProblem } from './003-throttle';
import { deepCloneProblem } from './004-deep-clone';
import { arrayFlattenProblem } from './005-array-flatten';
import { curryProblem } from './006-curry';
import { promiseAllProblem } from './007-promise-all';
import { pubSubProblem } from './008-pub-sub';
import { arrayDeduplicationProblem } from './009-array-deduplication';
import { callApplyBindProblem } from './010-call-apply-bind';
import { threeSumProblem } from './011-three-sum';
import { lengthOfLongestSubstringProblem } from './012-longest-substring';
import { reverseListProblem } from './013-reverse-list';
import { binaryTreeTraversalProblem } from './014-binary-tree-traversal';
import { implementHooksProblem } from './015-implement-hooks';
import { virtualDomDiffProblem } from './016-virtual-dom-diff';
import { routerImplementationProblem } from './017-router-implementation';
import { cssLayoutProblem } from './018-css-layout';
import { eventDelegationProblem } from './019-event-delegation';
import { lazyLoadProblem } from './020-lazy-load';
import type { Problem } from '../../types/problem';

export const problems: Problem[] = [
  twoSumProblem,
  debounceProblem,
  throttleProblem,
  deepCloneProblem,
  arrayFlattenProblem,
  curryProblem,
  promiseAllProblem,
  pubSubProblem,
  arrayDeduplicationProblem,
  callApplyBindProblem,
  threeSumProblem,
  lengthOfLongestSubstringProblem,
  reverseListProblem,
  binaryTreeTraversalProblem,
  implementHooksProblem,
  virtualDomDiffProblem,
  routerImplementationProblem,
  cssLayoutProblem,
  eventDelegationProblem,
  lazyLoadProblem,
];

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find(p => p.slug === slug);
}
