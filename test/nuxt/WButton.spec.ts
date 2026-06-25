import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WButton from '~/components/ui/WButton.vue'

describe('WButton', () => {
    it('renders the slot content', () => {
        const wrapper = mount(WButton, {
            slots: {
                default: 'Hello world',
            }
        })

        expect(wrapper.text()).toContain('Hello world')
    })

    it('emits a click event when clicked', async () => {
        const wrapper = mount(WButton, {
            slots: {
                default: 'Hello world',
            },
        })

        await wrapper.find('[data-test="button"]').trigger('click')
        const clickEvent = wrapper.emitted('click')

        expect(clickEvent).toHaveLength(1)
    })

    it('does not emit a click event when disabled', async () => {
        const wrapper = mount(WButton, {
            props: { disabled: true },
        })

        expect(wrapper.find('[data-test="button"]').attributes('disabled')).toBeDefined()
    })

    it('applies class based on type prop', () => {
        const wrapperPrimary = mount(WButton, {
            props: { type: 'primary' },
        })

        const wrapperSecondary = mount(WButton, {
            props: { type: 'secondary' },
        })

        const wrapperGhost = mount(WButton, {
            props: { type: 'ghost' },
        })

        const wrapperTypeless = mount(WButton)

        expect(wrapperPrimary.classes()).toContain('primary')
        expect(wrapperTypeless.classes()).toContain('primary')
        expect(wrapperSecondary.classes()).toContain('secondary')
        expect(wrapperGhost.classes()).toContain('ghost')
    })
})