import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ru } from 'vuetify/locale';

const vuetify = createVuetify({
    locale: {
        locale: 'ru',
        messages: { ru },
      },
    components,
    directives
})

export default vuetify