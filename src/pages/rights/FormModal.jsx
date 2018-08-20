import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, addInfo, editInfo } from '../../redux/rights.redux'
import InfoForm from './InfoForm'

@connect(
    state => state.rights,
    { handleModalForm, addInfo, editInfo }
)
class FormModal extends PureComponent {
    handleSubmit = () => {
        const form = this.refs.infoForm
        const { formType, addInfo, editInfo } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                if (formType === 'add') {
                    addInfo(values)
                } else if (formType === 'edit') {
                    editInfo(values)
                }
            }
        })
    }
    render() {
        const { formType, modalOpen, formData } = this.props
        return (
            <Modal
                title={formType === 'add' ? '新增' : '编辑'}
                visible={modalOpen}
                okText='确认'
                cancelText='取消'
                maskClosable={false}
                onOk={this.handleSubmit}
                onCancel={() => { this.props.handleModalForm(formType, false) }}
            >
                <InfoForm formType={formType} formData={formData} ref="infoForm" />
            </Modal>
        )
    }
}
export default FormModal