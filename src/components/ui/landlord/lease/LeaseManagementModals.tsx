// components/ui/landlord/lease/LeaseManagementModals.tsx
import ChangeRentModal from "./ChangeRentModal";
import ConfirmUnitSwitchModal from "./ConfirmUnitSwitchModal";
import DateAdjustmentModal from "./DateAdjustmentModal";
import EditTenantPhoneModal from "./EditTenantPhoneModal";
import EmergencyContactModal from "./EmergencyContactModal";
import FeeConfigModal from "./FeeConfigModal";
import IssueVacateNoticeModal from "./IssueVacateNoticeModal";
import LeaseActionBanner from "./LeaseActionBanner";
import PayRentMethodModal, { RentPaymentMethod } from "./PayRentMethodModal";
import TakeNoteProrateModal from "./TakeNoteProrateModal";
import TerminateLeaseModal from "./TerminateLeaseModal";
import UpdateTenantPhotoIdModal from "./UpdateTenantPhotoIdModal";
import WaiveRentModal from "./WaiveRentModal";

interface LeaseManagementModalsProps {
  tenantName: string;
  unitName: string;
  buildingName: string;
  tenantPhone: string;
  tenantSecondaryPhone: string;
  onUpdateTenantPhones: (phone: string, secondaryPhone: string) => void;

  isPayRentOpen: boolean;
  onClosePayRent: () => void;
  onSelectPaymentMethod: (method: RentPaymentMethod) => void;

  isChangeRentOpen: boolean;
  onCloseChangeRent: () => void;
  onSubmitRentChange: (payload: {
    newRentAmount: number;
    effectiveDate: string;
  }) => void;

  isWaiveRentOpen: boolean;
  onCloseWaiveRent: () => void;
  onConfirmWaiveRent: (amount: number) => void;

  dateModalConfig: { open: boolean; mode: "grace" | "endDate" };
  onCloseDateModal: () => void;
  onConfirmDateAdjust: (newDate: string) => void;

  isTerminateOpen: boolean;
  onCloseTerminate: () => void;
  onConfirmTerminate: (terminationDate: string) => void;

  isVacateNoticeOpen: boolean;
  onCloseVacateNotice: () => void;
  onConfirmVacateNotice: (payload: {
    newEndDate: string;
    reasons: string[];
  }) => void;

  isPhotoIdUploadOpen: boolean;
  onClosePhotoIdUpload: () => void;
  onSubmitPhotoId: (source: "gallery" | "camera" | null) => void;

  isUnitSwitchOpen: boolean;
  onCloseUnitSwitch: () => void;
  onConfirmUnitSwitch: (newUnit: string) => void;

  isEmergencyContactOpen: boolean;
  onCloseEmergencyContact: () => void;
  onSaveEmergencyContacts: (selected: any[]) => void;

  isEditPhoneOpen: boolean;
  onCloseEditPhone: () => void;

  feeModalConfig: {
    open: boolean;
    variant: "security_deposit" | "late_payment_fee";
  };
  onCloseFeeModal: () => void;
  onUpdateFeeConfig: (payload: {
    mode: string;
    value: string;
    daysAfter: string;
  }) => void;

  isProrateModalOpen: boolean;
  onCloseProrateModal: () => void;
  onProceedProrate: () => void;

  banner: { visible: boolean; message: string };
  onDismissBanner: () => void;
}

export default function LeaseManagementModals({
  tenantName,
  unitName,
  buildingName,
  tenantPhone,
  tenantSecondaryPhone,
  onUpdateTenantPhones,
  isPayRentOpen,
  onClosePayRent,
  onSelectPaymentMethod,
  isChangeRentOpen,
  onCloseChangeRent,
  onSubmitRentChange,
  isWaiveRentOpen,
  onCloseWaiveRent,
  onConfirmWaiveRent,
  dateModalConfig,
  onCloseDateModal,
  onConfirmDateAdjust,
  isTerminateOpen,
  onCloseTerminate,
  onConfirmTerminate,
  isVacateNoticeOpen,
  onCloseVacateNotice,
  onConfirmVacateNotice,
  isPhotoIdUploadOpen,
  onClosePhotoIdUpload,
  onSubmitPhotoId,
  isUnitSwitchOpen,
  onCloseUnitSwitch,
  onConfirmUnitSwitch,
  isEmergencyContactOpen,
  onCloseEmergencyContact,
  onSaveEmergencyContacts,
  isEditPhoneOpen,
  onCloseEditPhone,
  feeModalConfig,
  onCloseFeeModal,
  onUpdateFeeConfig,
  isProrateModalOpen,
  onCloseProrateModal,
  onProceedProrate,
  banner,
  onDismissBanner,
}: LeaseManagementModalsProps) {
  const isEndDateMode = dateModalConfig.mode === "endDate";

  return (
    <>
      <PayRentMethodModal
        visible={isPayRentOpen}
        onClose={onClosePayRent}
        onSelectMethod={onSelectPaymentMethod}
      />

      <ChangeRentModal
        visible={isChangeRentOpen}
        unitName={unitName}
        onCancel={onCloseChangeRent}
        onSubmit={onSubmitRentChange}
      />

      <WaiveRentModal
        visible={isWaiveRentOpen}
        onCancel={onCloseWaiveRent}
        onConfirmWaive={onConfirmWaiveRent}
      />

      <DateAdjustmentModal
        visible={dateModalConfig.open}
        title={isEndDateMode ? "Adjust Lease End Date" : "Adjust Due Date"}
        subtitle={
          isEndDateMode
            ? "Pick Your New Lease End Date"
            : "Pick Your New Due Date"
        }
        initialDateLabel={
          isEndDateMode ? "Initial Lease End Date" : "Initial Due Date"
        }
        newDateLabel={isEndDateMode ? "New Lease End Date" : "New Due Date"}
        onCancel={onCloseDateModal}
        onConfirmAdjust={onConfirmDateAdjust}
      />

      <TerminateLeaseModal
        visible={isTerminateOpen}
        onCancel={onCloseTerminate}
        onConfirmTerminate={onConfirmTerminate}
      />

      <IssueVacateNoticeModal
        visible={isVacateNoticeOpen}
        tenantName={tenantName}
        unitName={unitName}
        buildingName={buildingName}
        onCancel={onCloseVacateNotice}
        onConfirmNotice={onConfirmVacateNotice}
      />

      <UpdateTenantPhotoIdModal
        visible={isPhotoIdUploadOpen}
        tenantName={tenantName}
        onClose={onClosePhotoIdUpload}
        onSubmit={onSubmitPhotoId}
      />

      <ConfirmUnitSwitchModal
        visible={isUnitSwitchOpen}
        onCancel={onCloseUnitSwitch}
        onConfirmSwitch={onConfirmUnitSwitch}
      />

      <EmergencyContactModal
        visible={isEmergencyContactOpen}
        defaultContactName={tenantName}
        onCancel={onCloseEmergencyContact}
        onSaveContacts={onSaveEmergencyContacts}
      />

      <EditTenantPhoneModal
        visible={isEditPhoneOpen}
        tenantName={tenantName}
        initialPhone={tenantPhone}
        initialSecondaryPhone={tenantSecondaryPhone}
        onCancel={onCloseEditPhone}
        onSave={({ phone, secondaryPhone }) => {
          onUpdateTenantPhones(phone, secondaryPhone || "");
          onCloseEditPhone();
        }}
      />

      <FeeConfigModal
        visible={feeModalConfig.open}
        variant={feeModalConfig.variant}
        onCancel={onCloseFeeModal}
        onUpdate={onUpdateFeeConfig}
      />

      <TakeNoteProrateModal
        visible={isProrateModalOpen}
        onCancel={onCloseProrateModal}
        onProceed={onProceedProrate}
      />

      <LeaseActionBanner
        visible={banner.visible}
        message={banner.message}
        onDismiss={onDismissBanner}
      />
    </>
  );
}
