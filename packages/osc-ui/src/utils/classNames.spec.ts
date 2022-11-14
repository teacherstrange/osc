import { classNames } from './classNames';

test('joins classnames together', () => {
    expect(classNames('foo', 'bar', 'baz')).toEqual('foo bar baz');
    expect(classNames('foo', '', 'bar', 'baz')).toEqual('foo bar baz');
});
