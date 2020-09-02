
/**
* Power Button custom element.
*/
LW('lw-power-button', class PowerButton extends LW.ToggleButton {

    /**
    * CSS files needed for the element (ShadowDOM)
    */
    static get styleUrls() {
        return [
            'lw.powerbutton.css'
        ]
    }

    /** PowerButton's Html template. */
    template() {
        return `<div id='container' class='lw-container'>
                    <div id='powerButtonAnimation' class='lw-animation'></div>
                    <span id='button' class='lw-input' aria-hidden="true"></span>
                    <input id='hiddenInput' class='lw-hidden-input' type='hidden'>
                </div>`;
    }

    /** Called when the element is ready. Used for one-time configuration of the PowerButton. */
    ready() {
        const that = this;

        super.ready();
        that._updateHidenInputNameAndValue();
    }
});
