import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WDateInput from '~/components/ui/WDateInput.vue'

describe('WDateInput.vue', () => {
    it('renders in default and with props', () => {
        const defaultWrapper = mount(WDateInput)
        expect(defaultWrapper.find('[data-test="input"]').attributes('type')).toEqual('date')

        const propedWrapper = mount(WDateInput, {
            props: {
                error: 'TEST',
                label: 'TEST',
                disabled: true,
            }
        })

        expect(propedWrapper.find('[data-test="input-label"]').text()).toEqual('TEST')
        expect(propedWrapper.find('[data-test="input-error"]').text()).toEqual('TEST')
        expect(propedWrapper.find('[data-test="input"]').attributes('disabled')).toBeDefined()
    })

    it('uses datetime-local input type for datetime prop', () => {
        const wrapper = mount(WDateInput, { props: { type: 'datetime' } })
        expect(wrapper.find('[data-test="input"]').attributes('type')).toEqual('datetime-local')
    })

    it('displays ISO string as yyyy-MM-dd in date input', () => {
        const wrapper = mount(WDateInput, {
            props: { type: 'date', modelValue: '1970-01-01T00:00:00.000Z' }
        })
        expect(wrapper.find<HTMLInputElement>('[data-test="input"]').element.value).toBe('1970-01-01')
    })

    it('displays ISO string as local yyyy-MM-ddThh:mm in datetime-local input', () => {
        const isoString = '2024-06-10T12:00:00.000Z'
        const wrapper = mount(WDateInput, {
            props: { type: 'datetime', modelValue: isoString }
        })

        const d = new Date(isoString)
        const pad = (n: number) => String(n).padStart(2, '0')
        const expected = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
        expect(wrapper.find<HTMLInputElement>('[data-test="input"]').element.value).toBe(expected)
    })

    it('emits ISO string on date change', async () => {
        const wrapper = mount(WDateInput, { props: { type: 'date' } })
        const input = wrapper.find<HTMLInputElement>('[data-test="input"]')
        input.element.value = '2024-06-10'
        await input.trigger('change')

        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('2024-06-10T00:00:00.000Z')
    })

    it('emits ISO string on datetime change', async () => {
        const wrapper = mount(WDateInput, { props: { type: 'datetime' } })
        const input = wrapper.find<HTMLInputElement>('[data-test="input"]')
        input.element.value = '2024-06-10T12:00'
        await input.trigger('change')

        const expected = new Date('2024-06-10T12:00').toISOString()
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(expected)
    })

    it('does not emit for invalid or out-of-range dates', async () => {
        const wrapper = mount(WDateInput, { props: { type: 'datetime' } })
        const input = wrapper.find<HTMLInputElement>('[data-test="input"]')
        input.element.value = '2222222-06-10T12:00'
        await input.trigger('change')
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('emits undefined when input is cleared', async () => {
        const wrapper = mount(WDateInput, {
            props: { type: 'date', modelValue: '2024-06-10T00:00:00.000Z' }
        })
        const input = wrapper.find<HTMLInputElement>('[data-test="input"]')
        input.element.value = ''
        await input.trigger('change')
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBeUndefined()
    })
})
