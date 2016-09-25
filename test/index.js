import memoize, { forget, forgetAll } from '../src';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

describe('memoize', () => {
	it('should return a function', () => {
		const f = memoize(() => {});
		expect(f).to.be.a('function');
	});
	describe('const f = memoize(func)', () => {
		it('should return `func(args)` for `f(args)`', () => {
			const func = (a, b) => a + b;
			const f = memoize(func);
			expect(f(2,3)).to.equal(func(2,3,));
		});
		it('should call `func(args)` for the first call to `f(args)`', () => {
			const func = sinon.spy((a, b) => a + b);
			const f = memoize(func);
			f(2,3);
			expect(func.calledOnce).to.be.true;
		});
		it('should NOT call `func(args)` for the second call to `f(args)`', () => {
			const func = sinon.spy((a, b) => a + b);
			const f = memoize(func);
			f(2,3);
			f(2,3);
			expect(func.calledTwice).to.be.false;
		});
	});
	describe('forget(f, 2, 3)', () => {
		it('should forget the result of f(2,3)', () => {
			const func = sinon.spy((a, b) => a + b);
			const f = memoize(func);
			f(2,3);
			forget(f, 2, 3);
			f(2,3);
			expect(func.calledTwice).to.be.true;
		});
		it('should not forget the result of f(3,2)', () => {
			const func = sinon.spy((a, b) => a + b);
			const f = memoize(func);
			f(3,2);
			forget(f, 2, 3);
			f(3,2);
			expect(func.calledOnce).to.be.true;
		});
	});
	describe('forgetAll(f)', () =>{
		it('should forget all results of f', () => {
			const func = sinon.spy((a, b) => a + b);
			const f = memoize(func);
			f(2,3);
			forgetAll(f);
			f(2,3);
			expect(func.calledTwice).to.be.true;
		});
	});
});
