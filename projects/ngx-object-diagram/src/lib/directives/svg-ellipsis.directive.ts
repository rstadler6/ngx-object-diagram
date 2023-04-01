import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

const ELLIPSIS = '\u2026';

@Directive({
    selector: 'svg text[ngxSvgEllipsis]',
})
export class SvgEllipsisDirective implements OnInit {
    @Input()
    public text: string | undefined = '';

    @Input()
    public leaveSpace: number = 30;

    private _width: number = 0;

    constructor(private _el: ElementRef) {}

    public ngOnInit(): void {
        this._width = parseInt(getComputedStyle(this._el.nativeElement).getPropertyValue('--entity-min-width'), 10);
        this._textEllipsis(this._el.nativeElement);
    }

    private _textEllipsis(el: SVGTextContentElement) {
        let text = this.text ?? '';
        const width = this._width - this.leaveSpace;
        if (typeof el.getSubStringLength !== 'undefined') {
            el.textContent = `  ${text}`;
            let len = text.length;
            if (el.getSubStringLength(0, len) > width) {
                while (el.getSubStringLength(0, len--) > width) {}
                el.textContent = `  ${text.slice(0, len) + ELLIPSIS}`;
            }
        } else if (typeof el.getComputedTextLength !== 'undefined') {
            while (el.getComputedTextLength() > width) {
                text = text.slice(0, -1);
                el.textContent = ` ${text}${ELLIPSIS}`;
            }
        } else {
            // the last fallback
            while (el.getBBox().width > width) {
                text = text.slice(0, -1);
                // we need to update the textContent to update the boundary width
                el.textContent = ` ${text}${ELLIPSIS}`;
            }
        }

        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = text;
        el.appendChild(titleEl);
    }
}
