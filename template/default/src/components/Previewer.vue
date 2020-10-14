<script>
import Component from './Component';

export default {
    props: ['config'],
    render(h) {
        return h(Component, {
            props: {
                config: this.config,
                isEditing: true
            }
        });
    }
};
</script>
