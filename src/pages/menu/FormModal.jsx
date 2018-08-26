import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import { handleModalForm, addInfo, editInfo } from '../../redux/menu.redux'
import InfoForm from './InfoForm'

@connect(
    state => state,
    { handleModalForm, addInfo, editInfo }
)
class FormModal extends PureComponent {
    handleSubmit = () => {
        const form = this.refs.infoForm
        const { userid } = this.props.auth
        const { formType } = this.props.menu
        const { addInfo, editInfo } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                if(values.parentid){
                    values.level = 2
                }else{
                    values.level = 1
                }
                values.creatorid = userid
                if (formType === 'add') {
                    addInfo(values)
                } else if (formType === 'update') {
                    editInfo(values)
                }
            }
        })
    }
    render() {
        const { formType, modalOpen, formData } = this.props.menu
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
                <InfoForm formType={formType} formData={formData} ref='infoForm' />
            </Modal>
        )
    }
}
export default FormModal