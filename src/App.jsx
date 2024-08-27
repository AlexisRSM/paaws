import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'

import Login from './pages/Login'
import Register from './pages/Register'
import ResetPass from './pages/ResetPass'

import UserProfile from './pages/UserProfile'
import PersonalData from './pages/PersonalData'

import AnimalSearch from './pages/AnimalSearch'
import AnimalPage from './pages/AnimalPage'
import SponsorPage from './pages/SponsorPage'
import AdoptionForm from './pages/AdoptionForm'

import AdminAdd from './pages/Admin/AdminAdd'
import AdminEdit from './pages/Admin/AdminEdit'
import AdminDelete from './pages/Admin/AdminDelete'
import AdminPage from './pages/Admin/AdminPage'
import AdoptionStatus from './pages/Admin/AdoptionStatus'
import AdminFormView from './pages/Admin/AdminFormView'

import SuccessPage from './pages/Payment/SucessPage'
import CancelPage from './pages/Payment/CancelPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={< Home />} />

          <Route path="/login" element={< Login />} /> {/* Done -RM */}
          <Route path="/register" element={< Register />} /> {/* Done -RM */}
          <Route path="/resetpass" element={< ResetPass />} />

          <Route path="/userprofile" element={< UserProfile />} /> {/* Done -RM */}
          <Route path="/personaldata" element={< PersonalData />} />

          <Route path="/ourpets" element={< AnimalSearch />} />
          <Route path="/animalpage/:id" element={< AnimalPage />} /> {/* Need to make route get single pet-RM */}
          {/* Route is done - BM */}
          <Route path="/adoptionform/:id" element={< AdoptionForm />} />
          <Route path="/sponsor/:id" element={< SponsorPage />} />
          {/* I didn't add /:id so you could see the page first, but once it's working through ids, we should add it to the route - BF */}

          <Route path="/adminadd" element={< AdminAdd />} />
          <Route path="/adminedit" element={< AdminEdit />} />
          <Route path="/admindelete" element={< AdminDelete />} />
          <Route path="/adoptionstatus" element={< AdoptionStatus />} />
          {/*  <Route path="/adoptionform_adminview/:id" element={< adoptionform_adminview />} /> */}
          <Route path="/adoptionform_adminview/:id" element={< AdminFormView />} />
          <Route path="/adminpage" element={< AdminPage />} />

          <Route path="/success" element={<SuccessPage />} />
          {/* Added to test payments */}
          <Route path="/cancel" element={<CancelPage />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
