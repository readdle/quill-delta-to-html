
import 'mocha';
import * as assert from 'assert';

import {
    makeEndTag, 
    makeStartTag,
    encodeWhitespaces,
    encodeHtml,
    decodeHtml,
    encodeLink
} from "./../src/funcs-html";


describe('html module', function () {

    describe('makeStartTag()', function () {
        it('should make proper html start tags', function() {

            var act = makeStartTag('a');
            assert.equal(act, '<a>');

            act = makeStartTag('');
            assert.equal(act, '');

            act = makeStartTag('br');
            assert.equal(act, '<br/>');

            act = makeStartTag('img', [{key: 'src', value:'http://'}]);
            assert.equal(act, '<img src="http://"/>');

            var attrs = [
                {key: 'class', value:' cl1 cl2'}, 
                {key:'style', value:'color:#333'}
            ];
            act = makeStartTag('p', attrs);
            assert.equal(act, '<p class=" cl1 cl2" style="color:#333">');

            assert.equal(makeStartTag("p", [{key:'checked'}]), '<p checked>');
        });
    });

    describe('makeEndTag()', function () {
        it('should make proper html end tags', function() {

            var act = makeEndTag('a');
            assert.equal(act, '</a>');

            act = makeEndTag();
            assert.equal(act, '');
        });
    });

    describe('encodeHtml()', function () {
        it('should encode < > & " \' / characters', function() {

            var act = encodeHtml('hello"my<lovely\'/>&amp;friend&here()', false);
            assert.equal(act, 'hello&quot;my&lt;lovely&#x27;&#x2F;&gt;&amp;amp;friend&amp;here()');

            var act = encodeHtml('hello"my<lovely\'/>&amp;friend&here()');
            assert.equal(act, 'hello&quot;my&lt;lovely&#x27;&#x2F;&gt;&amp;friend&amp;here()');
        });
    });

    describe('encodeWhitespaces()', function () {
        it('should encode whitespace character', function() {

            var act = encodeWhitespaces('\n');
            assert.equal(act, '\n');

            var act = encodeWhitespaces(' ');
            assert.equal(act, '&nbsp;');

            var act = encodeWhitespaces('  ');
            assert.equal(act, '&nbsp;&nbsp;');

            var act = encodeWhitespaces('a b');
            assert.equal(act, 'a b');

            var act = encodeWhitespaces('a'+' '.repeat(5)+'b');
            assert.equal(act, 'a&nbsp; &nbsp; &nbsp;b');

            var act = encodeWhitespaces('a'+' '.repeat(6)+'b');
            assert.equal(act, 'a&nbsp;&nbsp; &nbsp; &nbsp;b');

            var act = encodeWhitespaces('123   456');
            assert.equal(act, '123&nbsp; &nbsp;456');

            var act = encodeWhitespaces('  123   456  ');
            assert.equal(act, '&nbsp;&nbsp;123&nbsp; &nbsp;456&nbsp;&nbsp;');
        });
    });

    describe('decodeHtml()', function () {
        it('should decode html', function() {

            var act = decodeHtml('hello&quot;my&lt;lovely&#x27;&#x2F;&gt;&amp;friend&amp;here');
            assert.equal(act, 'hello"my<lovely\'/>&friend&here');

        });
    });

    describe('encodeLink()', function () {
        it('should encode link', function() {

            var act = encodeLink('http://www.yahoo.com/?a=b&c=<>()"\'');
            assert.equal(act, 'http://www.yahoo.com/?a=b&amp;c=&lt;&gt;&#40;&#41;&quot;&#x27;');

        });
    });
});
