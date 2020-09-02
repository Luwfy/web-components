
LW('lw-rating', class Rating extends LW.BaseElement {
    static get properties() {
        return {
            'max':
            {
                value: 5,
                type: 'number'
            },
            'name':
            {
                value: 'rating',
                type: 'string'
            },
            'value':
            {
                value: 3,
                type: 'number'
            }
        };
    }

    static get listeners() {
        return {
            'stars.click': '_clickHandler',
            'stars.move': '_moveHandler',
            'stars.mouseout': '_mouseoutHandler'
        };
    }

    attached() {
        // this.itemsIndexes = [...Array(this.max).keys()];

        if (this.value > this.max) {
            this.value = this.max;
        }

        this._updateActiveStars(this.value);
    }

    template() {
        return `<div id="container" role="presentation">
                    <div id="stars" class="lw-content" role="presentation">
                        <template>
                            <div id="ratingStars" *items={{max}} role="presentation"><span class="rating-star" index={{item}} role="button" aria-label="Star"></span></div>
                        </template>
                    </div>
                    <input class="lw-hidden" value="[[value]]" name="[[max]]"></input>
                </div>`;
    }

    render() {
        const that = this;

        that.setAttribute('role', 'group');
        if (!that.disabled) {
            that.setAttribute('tabindex', '0');
        }
        that.$.stars.firstElementChild.setAttribute('role', 'presentation');

        super.render();
        
    }

    _clickHandler(event) {
        if (event.target.className.includes('rating-star')) {
            const star = event.target;
            const ratingContainer = star.parentNode;
            const starIndex = Array.prototype.indexOf.call(ratingContainer.children, star);

            this.value = starIndex + 1;
            this._updateActiveStars(this.value);
            this._updateHoveredStars(0);
        }
    }

    _moveHandler(event) {
        const that = this;

        const getOffset = (el) => {
            const rect = el.getBoundingClientRect();
            return {
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY
            };
        }

        const getHoveredStarIndex = () => {
            const stars = that.querySelectorAll('#ratingStars .rating-star');
            for (let i = 0; i < stars.length; i++) {

                const offset = getOffset(stars[i]);
                if (event.x >= offset.left && event.x <= offset.left + stars[i].offsetWidth) {
                    return i;
                }
            }
        }

        const starIndex = getHoveredStarIndex();
        that._updateHoveredStars(starIndex + 1);
    }

    _mouseoutHandler() {
        this._updateHoveredStars(0);
    }

    _updateActiveStars(value) {
        const stars = this.getElementsByClassName('rating-star');

        for (let i = 0; i < stars.length; i++) {
            if (i < value) {
                stars[i].classList.add('active');
            }
            else {
                stars[i].classList.remove('active');
            }
        }
    }

    _updateHoveredStars(value) {
        if (LW.Utilities.Core.isMobile) {
            return;
        }

        const stars = this.getElementsByClassName('rating-star');

        for (let i = 0; i < stars.length; i++) {
            if (i < value) {
                stars[i].classList.add('hover');
            }
            else {
                stars[i].classList.remove('hover');
            }
        }
    }
});