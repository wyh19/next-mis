import React, { Fragment,PureComponent } from 'react'
import SearchForm from './SearchForm'
import DataTable from './DataTable'
import FormModal from './FormModal'
import './Page.scss'

class Page extends PureComponent {
    render() {
        return (
            <Fragment>
                <SearchForm />
                <DataTable />
                <FormModal />
            </Fragment>
        )
    }
}

export default Page