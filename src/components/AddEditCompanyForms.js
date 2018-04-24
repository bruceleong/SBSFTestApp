import React from 'react'
import { db } from '../config/constants'
import firebase from 'firebase'
require('firebase/firestore')

const AddEditCompany = (props) => (

    <div>
        <h2>Company Forms</h2>
        <form onSubmit={props.container.formHandleSubmit}>
            <h3>Add new Forms</h3>
            <div>
                <label htmlFor="companyFormName">Name of form:</label><input
                    name="companyFormName" onChange={props.container.handleChange}
                    value={props.container.companyFormName} />
            </div>
            <div>
                <label htmlFor="companyFormUrl">Url of form:</label><input
                    name="companyFormUrl" onChange={props.container.handleChange}
                    value={props.container.companyFormUrl} />
            </div>
            <input type="submit" />
        </form>
        <h3>Current Forms:</h3>
        <ul>
            {
                props.container.companyData.map((ele, idx) => (
                    <div key={ele[0]}>
                        <br />
                        <p>Name of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                            {ele[0]}
                        </a></p>
                        <p>Link of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
                            {ele[1]}
                        </a></p>
                        <button
                            type='button'
                            onClick={() => props.container.editForm(ele[0], ele[1])}>Edit Link
                        </button>
                        <button
                            type='button'
                            onClick={
                                () => {
                                    db.collection('companies').doc(props.container.companyName).collection('Forms').doc('formDoc').update({
                                        [ele[0]]: firebase.firestore.FieldValue.delete()
                                    })
                                    props.container.updateCompanyData()
                                }
                            }>Delete Form</button>
                        <br />
                        <br />
                    </div>
                ))
            }
        </ul>
    </div>

)

export default AddEditCompany

// function AddEditCompany(props){
    
// }

// export default class AddEditCompany extends Component {

//     constructor(props) {
//         super(props)
//         // this.updateCompanyData()
//         // this.state = {
//         //     companyName: '',
//         //     companyProvider: '',
//         //     companyData: [],
//         //     spd: '',
//         //     companyFormName: '',
//         //     companyFormUrl: '',
//         //     changesSubmitted: false
//         // }
//     }

//     render(){

//         <div>
//             <h2>Company Forms</h2>
//             <form onSubmit={props.container.formHandleSubmit}>
//                 <h3>Add new Forms</h3>
//                 <div>
//                     <label htmlFor="companyFormName">Name of form:</label><input
//                         name="companyFormName" onChange={props.container.handleChange}
//                         value={props.container.companyFormName} />
//                 </div>
//                 <div>
//                     <label htmlFor="companyFormUrl">Url of form:</label><input
//                         name="companyFormUrl" onChange={props.container.handleChange}
//                         value={props.container.companyFormUrl} />
//                 </div>
//                 <input type="submit" />
//             </form>
//             <h3>Current Forms:</h3>
//             <ul>
//                 {
//                     props.container.companyData.map((ele, idx) => (
//                         <div key={ele[0]}>
//                             <br />
//                             <p>Name of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
//                                 {ele[0]}
//                             </a></p>
//                             <p>Link of form: <a target="_blank" href={ele[1]} style={{ display: 'inline' }}>
//                                 {ele[1]}
//                             </a></p>
//                             <button
//                                 type='button'
//                                 onClick={() => props.container.editForm(ele[0], ele[1])}>Edit Link
//                             </button>
//                             <button
//                                 type='button'
//                                 onClick={
//                                     () => {
//                                         db.collection('companies').doc(props.container.companyName).collection('Forms').doc('formDoc').update({
//                                             [ele[0]]: firebase.firestore.FieldValue.delete()
//                                         })
//                                         props.container.updateCompanyData()
//                                     }
//                                 }>Delete Form</button>
//                             <br />
//                             <br />
//                         </div>
//                     ))
//                 }
//             </ul>
//         </div>
//     }
// }