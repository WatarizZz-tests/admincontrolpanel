import "./datatable.scss";
import "./popupstyle.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Box from "@mui/material/Box";
import Swal from 'sweetalert2'
// import { styled } from "@mui/material/styles";



const Datatable = () => {
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);


  ////////that's unused code in case w wanted to make checkbox in data grid gren and use checkbox as selector for adding options
//   const  customCheckbox =(theme) => {
//     return {
//       "& .MuiCheckbox-root svg": {
//         width: 16,
//         height: 16,
//         backgroundColor: "transparent",
//         border: "#ade88b 1px solid "
//        ,
//         borderRadius: 2,
//       },
//       "& .MuiCheckbox-root svg path": {
//         display: "none",
//       },
//       "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
//         backgroundColor: "#7cd660",
//         borderColor: "#7cd660",
//       },
     
//    };
//   }
  
//   const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
   
    
  
//    ...customCheckbox(theme),
//  }));
 



 const OnStopClick = async (id) => {
  const rdvDoc = doc(db, "rdv", id);
  try {
    await updateDoc(rdvDoc, { statut: "terminé" });
  } catch (err) {
    console.log(err);
  }
};

 const handleDelete = async (id) => {
  Swal.fire({
    title: "etes vous sure?",
    text: "cette action est non reversible!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "annuler",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui, Supprimer!"
  }).then((result) => {
    if (result.isConfirmed) {
      
      deleteDoc(doc(db, "rdv", id));
      setData(data.filter((item) => item.id !== id));
      
      Swal.fire({
        title: "Supprimé!",
        text: "Votre client a été supprimé de la database.",
        icon: "success"
      });
    }
  });
  
};

  const OnClickRdvDate = async (id) => {
    const daterdvDoc = doc(db, "rdv", id);
    try {
      await updateDoc(daterdvDoc, { daterdv: selectedDate.toLocaleString() });
    } catch (err) {
      console.log(err);
    }
  };

//////amoun
  useEffect(() => {
  
    const unsub = onSnapshot(
      collection(db, "rdv"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

 
  


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
               
               <Popup trigger=
                {<button className="viewButton"> Voir la description </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content1'>
                              <h4>adresse mail du patient : {params.row.mail}</h4>
                              <h3>Description de la maladie</h3>
                                {params.row.desc}
                            </div>
                            <div>
                                <button className="viewButton1" onClick=
                                    {() => close()}>
                                        Fermer
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
          
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Supprimer
            </div>
            
            <Popup   trigger=
                {<button className="statusButton"> planifier </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                            <DatePicker
                              selected={selectedDate}
                              onChange={date => setSelectedDate(date)}
                              minDate={new Date()}
                              filterDate={date => date.getDay() !== 5}
                              placeholderText="Choisir une date"
                              dateFormat="dd/MM/yyyy hh:mm:ss"
                              showTimeSelect
                              shouldCloseOnSelect= {false}
                            />
                            <button className="viewButton1" onClick={() =>OnClickRdvDate(params.row.id)}>Confirmer le rendez vous</button>
                              
                               
                            </div>
                            <span>rendez vous confirmé !</span>
                            <div>
                                <button className="viewButton1 closeit" onClick=
                                    {() => close()}>
                                        Fermer
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>

            <div
              className="endButton"
              onClick={ () =>OnStopClick(params.row.id)} 
            >
              Terminer
            </div>
          </div>
        );
      },
    },
  ];



  const statutColumn = [
    {
      field: "statut",
      headerName: "statut",
      width: 85,
      renderCell: (params) => {
        return (
          <div className={params.row.statut === "actif" ? "cellAction actifclassgreen" : "termineclassred cellAction"}>
               {params.row.statut}
          </div>
        );
      },
    },
  ];

  const dateRdvColumn = [
    {
      field: "daterdv",
      headerName: "date du rdv",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="datepickpick">
               {params.row.daterdv}
               
          </div>
        );
      },
    },
  ];
 



  return (
    <div className="datatable">
      <div className="datatableTitle">
        Ajouter un rendez vous
        <Link to="/users/new" className="link">
          Ajouter
        </Link>
      </div>
      <Box sx={{ width: 1}}>
      <Box sx={{ height: 600 }}>
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(dateRdvColumn,statutColumn,actionColumn)}
        checkboxSelection
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: () => {
          return (<GridToolbarContainer sx={{justifyContent: 'space-between'}}>
            <GridToolbarQuickFilter />
            <GridToolbarExport />
          </GridToolbarContainer>)} 
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
        
      />
       </Box>
    </Box>
    </div>
  );
};


export default Datatable;
