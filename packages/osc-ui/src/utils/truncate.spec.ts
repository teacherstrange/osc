import { truncate } from './truncate';

test('truncates text by default to a maximum of 343 characters', () => {
    expect(
        truncate(
            'Following a year of huge growth, the next generation of our family-owned and run business are now the principal drivers taking it forward into its 16th year. Our Co-founder and former Chairman, Mark Rutter, who this year celebrates 30 years in the distance learning sector, will be assuming a new role as Non-Executive Director. Meanwhile, etc. etc. etc.'
        )
    ).toBe(
        'Following a year of huge growth, the next generation of our family-owned and run business are now the principal drivers taking it forward into its 16th year. Our Co-founder and former Chairman, Mark Rutter, who this year celebrates 30 years in the distance learning sector, will be assuming a new role as Non-Executive Director. Meanwhile, […]'
    );
});

test('truncates text to custom length', () => {
    expect(
        truncate(
            'Following a year of huge growth, the next generation of our family-owned and run business are now the principal drivers taking it forward into its 16th year. Our Co-founder and former Chairman, Mark Rutter, who this year celebrates 30 years in the distance learning sector, will be assuming a new role as Non-Executive Director. Meanwhile, etc. etc. etc.',
            100
        )
    ).toBe(
        'Following a year of huge growth, the next generation of our family-owned and run business are now[…]'
    );
});

test('returns original string if the length is greater than the max length', () => {
    expect(truncate('Lorem ipsum, dolor sit amet consectetur adipisicing elit.')).toBe(
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit.'
    );
});
