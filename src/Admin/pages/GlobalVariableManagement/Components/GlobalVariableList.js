import React, { useState, useEffect } from 'react';
import { globalVariablesService } from '../../../../AdminServices/globalVariable.service';
import { Box } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import AddGlobalVariableModal from './AddGlobalVariableModal';
import DeleteGlobalVariableModal from './DeleteGlobalVariableModal'
import UpdateGlobalVariableModal from './UpdateGlobalVariableModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PropaneSharp } from '@mui/icons-material';
import '../../../../Styles/ReportsPage.css';

function GlobalVariableList(prop) {

    const [globalVariables, setGlobalVariables] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    const [curVarId, setCurVarId] = useState("");
    const [curVarName, setCurVarName] = useState("");
    const [curRow, setCurRow] = useState([]);
    const getAllGlobalVariables = () => {
        const user = JSON.parse(window.localStorage.getItem("userData"));
        console.log(user);
        globalVariablesService
            .getGlobalAllVarialbes(user.merchantId)
            .then((response) => {

                console.log(response);
                setGlobalVariables(response);
            }).catch((error) => {

            })
    }

    const viewShowDialog = () => {
        setShowAddDialog(true);
    }

    const viewUpdateDialog = (variable) => {
        setCurRow(variable);
        setShowUpdateDialog(true);
    }

    const deleteVariable = (varId, varName) => {



        setCurVarId(varId);
        setCurVarName(varName);

        setShowDeleteDialog(true);
        // const user = JSON.parse(window.localStorage.getItem("userData"));
        // console.log(user);
        // console.log(varId);

        // globalVariablesService
        //     .deleteGlobalVariable(varId,user.merchantId)
        //     .then((response) => {

        //         console.log(response);
        //     }).catch((error) => {

        //     })
    }

    const createDelete = (varId, varName) => {

        return (
            <Button sx={{ color: 'orange', borderColor: 'orange' }} variant="outlined" size="small" startIcon={<DeleteIcon />}
                onClick={(event) => deleteVariable(varId, varName)}
            >
                Delete
            </Button >

        );
    }



    const createUpdate = (variable) => {

        return (
            <Button sx={{ color: 'orange', borderColor: 'orange' }} variant="outlined" size="small" startIcon={<EditIcon />}
                onClick={(event) => viewUpdateDialog(variable)}
            >
                Edit
            </Button >

        );
    }


    useEffect(() => {

        getAllGlobalVariables();
    }, [showAddDialog, showDeleteDialog, showUpdateDialog]);


    const columns = React.useMemo(() => [
        // {
        //     name: 'Billing  Cycle From',
        //     id: 'billingCycleFrom',
        //     width: '12%',
        //     selector: row => row.billingCycleFrom,
        //     sortable: true,

        // },
        // {
        //     name: 'Billing Cycle To',
        //     id: 'billingCycleTo',
        //     width: '12%',
        //     selector: row => row.billingCycleTo,
        //     sortable: true,
        // },
        {
            name: 'Name',
            id: 'name',
            selector: row => row.name,
            sortable: true,
            // omit: !uploadDateCol,
            reorder: true,
            left: true,
            // sortFunction: customSort
        },
        {
            name: 'Data Type',
            id: 'dataType',
            selector: row => row.type,
            sortable: true,
            left: true,
            // omit: !serviceCol,
            reorder: true,
        },
        {
            name: 'Visible',
            id: 'alwaysVisible',
            // width: '12%',
            selector: row => (row.alwaysVisible == true ? 'True' : 'False'),
            sortable: true,
            left: true,
            // omit: !statementsUploadedCol,
            reorder: true,
        },

        {
            name: '',
            id: 'updateId',
            selector: row => createUpdate(row),
            sortable: true,
            width: '8%',
            minWidth : 100,
            // omit: !statementsUploadedCol,
            // omit: !statementsUploadedCol,
            // reorder: true,
            left: true,
        },

        {
            name: '',
            id: 'deleteId',
            selector: row => createDelete(row.id, row.name),
            sortable: true,
            width: '8%',
            minWidth : 100,
            // omit: !statementsUploadedCol,
            // omit: !statementsUploadedCol,
            // reorder: true,
            left: true,
        },

        // {
        //     name: 'Last Updated',
        //     id: 'lastUpdatedIndividual',
        //     selector: row => row.lastUpdated,
        //     sortable: true,
        // },
    ],
        [],
    );


    const handleCreate = (response) => {

        console.log(response);
        setShowAddDialog(false);
    }

    const handleDelete = (response) => {

        console.log(response);
        setShowDeleteDialog(false);
    }


    const handleUpdate = (response) => {

        console.log(response);
        setShowUpdateDialog(false);
    }
    return (


        <>
            {showAddDialog ? <AddGlobalVariableModal
                // merchantId={props.merchantId}
                confirm={handleCreate}
                showModal={showAddDialog} /> : null}

            {showUpdateDialog ? <UpdateGlobalVariableModal
                confirm={handleUpdate}
                variable={curRow}
                showModal={showUpdateDialog}
            /> : null

            }

            {showDeleteDialog ? <DeleteGlobalVariableModal
                confirm={handleDelete}
                varId={curVarId}
                varName={curVarName}
                showModal={showDeleteDialog} /> : null}

            <Box sx={{ width: '100%', marginLeft: 5 }} class="adminPage">





                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                // spacing={2}
                >

                    <Button
                        onClick={e => viewShowDialog()}
                        sx={{
                            minWidth: 230,
                            width: 230,
                            margin: 1,
                            border: 1,
                            borderColor: 'orange',
                            color: 'white',
                            backgroundColor: 'orange',
                            ":hover": {
                                backgroundColor: 'white', color: 'orange',
                                BorderColor: 'orange', border: 1
                            },
                        }}
                    >

                        + Create Global Variable
                    </Button>





                </Stack>
                <DataTable
                    columns={columns}
                    data={globalVariables}
                    pagination
                    // onRowClicked={rowClicked}
                    // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                    subHeader
                    // subHeaderComponent={subHeaderComponent}
                    fixedHeader='true'
                    // striped
                    persistTableHead
                    className='dataTableReport'
                    defaultSortFieldId={'uploadDate'}
                    highlightOnHover={true}
                    // progressPending={pending}
                    responsive={true}
                // theme="solarized"






                />
            </Box>

        </>
    )
}

export default GlobalVariableList