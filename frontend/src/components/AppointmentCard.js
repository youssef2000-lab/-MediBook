import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cancelAppointment } from '../store/appointmentSlice';
import './AppointmentCard.css';

const AppointmentCard = ({ appointment }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    if (window.confirm('هل أنت متأكد من إلغاء هذا الموعد؟')) {
      dispatch(cancelAppointment(appointment._id));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'قيد الانتظار';
      case 'cancelled':
        return 'ملغى';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'غير محدد';
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <h3>{appointment.doctorName || 'الطبيب'}</h3>
        <span className={`appointment-status ${getStatusClass(appointment.status)}`}>
          {getStatusText(appointment.status)}
        </span>
      </div>
      
      <div className="appointment-details">
        <div className="appointment-detail">
          <span className="label">التخصص:</span>
          <span className="value">{appointment.specialty || 'عام'}</span>
        </div>
        
        <div className="appointment-detail">
          <span className="label">التاريخ:</span>
          <span className="value">{formatDate(appointment.date)}</span>
        </div>
        
        <div className="appointment-detail">
          <span className="label">الوقت:</span>
          <span className="value">{formatTime(appointment.time)}</span>
        </div>
        
        <div className="appointment-detail">
          <span className="label">العنوان:</span>
          <span className="value">{appointment.location || 'غير محدد'}</span>
        </div>
        
        {appointment.notes && (
          <div className="appointment-detail">
            <span className="label">ملاحظات:</span>
            <span className="value">{appointment.notes}</span>
          </div>
        )}
      </div>
      
      <div className="appointment-actions">
        {appointment.status === 'pending' && (
          <button onClick={handleCancel} className="cancel-btn">
            إلغاء الموعد
          </button>
        )}
        
        {appointment.status === 'confirmed' && (
          <Link to={`/doctors/${appointment.doctorId}`} className="view-btn">
            عرض تفاصيل الطبيب
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;

