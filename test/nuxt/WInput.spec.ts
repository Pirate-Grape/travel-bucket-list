import {DOMWrapper, mount} from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import WInput from "~/components/ui/WInput.vue";

describe('WInput.vue', () => {
    it('renders in default and with props', () => {
        const defaultWrapper = mount(WInput)
        expect(defaultWrapper.find('[data-test="input"]').attributes('type')).toEqual('text')

        const propedWrapper = mount(WInput, {
            props: {
                error: 'TEST',
                label: 'TEST',
                placeholder: 'TEST',
                disabled: true
            }
        })

        expect(propedWrapper.find('[data-test="input-label"]').text()).toEqual('TEST')
        expect(propedWrapper.find('[data-test="input-error"]').text()).toEqual('TEST')
        expect(propedWrapper.find('[data-test="input"]').attributes('placeholder')).toEqual('TEST')
        expect(propedWrapper.find('[data-test="input"]').attributes('disabled')).toBeDefined()
    })
    it('works with text v-model', async () => {
        const wrapper = mount(WInput, {
            props: {
                modelValue: 'TEST'
            }
        })

        const input: DOMWrapper<HTMLInputElement> = wrapper.find('[data-test="input"]')
        expect(input.element.value).toBe('TEST')

        await input.setValue('ANOTHER TEST')
        expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual('ANOTHER TEST')
    })
    it('works with number v-model', async () => {
        const numberWrapper = mount(WInput, {
            props: {
                type: 'number'
            }
        })

        const numberInput: DOMWrapper<HTMLInputElement> = numberWrapper.find('[data-test="input"]')

        await numberInput.setValue(123)
        expect(numberWrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(123)

        await numberInput.setValue('asd123')
        expect(numberWrapper.emitted('update:modelValue')?.[1]?.[0]).toEqual('')
    })
})
