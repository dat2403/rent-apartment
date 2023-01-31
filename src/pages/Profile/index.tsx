import { CameraAlt, CancelOutlined, Edit } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

interface EditProfileModalProps {
  open: boolean;
  handleClose: () => void;
}

export const CustomText = styled(Typography)({
  color: '#29282b',
});

const Title = styled(CustomText)({
  fontSize: 16,
  fontWeight: 700,
});

export const Input = styled(TextField)({
  borderRadius: '10px',
  '& label.Mui-focused': {
    color: '#b772ff',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#9854df',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#b772ff',
    },
  },
});

export const RowStack = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
});

const CustomButton = styled(Button)({
  fontSize: 12,
  fontWeight: 500,
  textTransform: 'none',
  borderRadius: 6,
  padding: '12px 32px 10px',
});

export const SaveButton = styled(CustomButton)({
  color: '#fff',
  backgroundColor: '#8954C2',
  '&:hover': {
    backgroundColor: '#8954C2',
  },
});

export const CancelButton = styled(CustomButton)({
  color: '#181818',
  backgroundColor: '#F5F5F5',
  marginRight: 16,
  '&:hover': {
    backgroundColor: '#F5F5F5',
  },
});

export const CustomDivider = styled(Divider)({
  margin: '16px 0',
  borderColor: '#f1f1f1',
});

export const TextContent = styled(CustomText)({
  fontSize: 14,
});

export const CustomInput = styled(Input)({
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 400,
    color: '#29282b',
    lineHeight: '21px',
  },
});

const Profile: React.FC<EditProfileModalProps> = (props) => {
  const user = useSelector(selectUser);
  const [isEditName, setIsEditName] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.name || '');
  const [isEditEmail, setIsEditEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(user?.email || '');
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [address, setAddress] = useState<string>(user?.address || '');
  const [isEditPhone, setIsEditPhone] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>(user?.phone || '');

  const handleEditName = () => {
    setIsEditName(true);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSaveName = () => {
    setIsEditName(false);
  };

  const handleEditEmail = () => {
    setIsEditEmail(true);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSaveEmail = () => {
    setIsEditEmail(false);
  };

  const handleEditAddress = () => {
    setIsEditAddress(true);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleSaveAddress = () => {
    setIsEditAddress(false);
  };

  const handleEditPhone = () => {
    setIsEditPhone(true);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSavePhone = () => {
    setIsEditPhone(false);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 800,
          bgcolor: '#fff',
          borderRadius: 5,
          padding: '32px 47px 34px 59px',
        },
      }}
      open={props.open}
      onClose={props.handleClose}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
        size="small"
        onClick={props.handleClose}
      >
        <CancelOutlined />
      </IconButton>
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Hồ sơ người dùng
      </Typography>

      <RowStack>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#c8c8c8',
                '&:hover': {
                  bgcolor: '#c8c8c8',
                },
              }}
            >
              <CameraAlt />
            </IconButton>
          }
        >
          <Avatar sx={{ bgcolor: deepPurple[500], width: 96, height: 96 }}>
            {user?.name?.slice(0, 2).toUpperCase()}
          </Avatar>
        </Badge>
        {isEditName ? (
          <Box flexGrow={1} ml={2.5}>
            <Input
              size="small"
              fullWidth
              multiline
              rows={2}
              type="text"
              value={name}
              onChange={handleChangeName}
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#29282b',
                  lineHeight: '36px',
                },
              }}
            />
          </Box>
        ) : (
          <Title ml={2.25}>{name}</Title>
        )}
        {!isEditName && (
          <IconButton sx={{ ml: 'auto' }} size="small" onClick={handleEditName}>
            <Edit />
          </IconButton>
        )}
      </RowStack>
      {isEditName && (
        <>
          <RowStack mt={1.5} justifyContent="flex-end">
            <CancelButton>Cancel</CancelButton>
            <SaveButton onClick={handleSaveName}>Save</SaveButton>
          </RowStack>
          <CustomDivider />
        </>
      )}

      <Box
        sx={{
          marginTop: isEditName ? 0 : 3,
        }}
      >
        <Box>
          <RowStack mb={1}>
            <Title>Email</Title>
            <IconButton
              sx={{ ml: 'auto' }}
              size="small"
              onClick={handleEditEmail}
            >
              <Edit />
            </IconButton>
          </RowStack>
          {isEditEmail ? (
            <>
              <CustomInput
                fullWidth
                type="text"
                size="small"
                value={email}
                onChange={handleChangeEmail}
              />
              <RowStack mt={1.5} justifyContent="flex-end">
                <CancelButton>Hủy</CancelButton>
                <SaveButton onClick={handleSaveEmail}>Lưu</SaveButton>
              </RowStack>
            </>
          ) : (
            <TextContent>{email}</TextContent>
          )}
        </Box>

        <CustomDivider />

        <Box>
          <RowStack mb={1}>
            <Title>SĐT</Title>
            <IconButton
              sx={{ ml: 'auto' }}
              size="small"
              onClick={handleEditPhone}
            >
              <Edit />
            </IconButton>
          </RowStack>
          {isEditPhone ? (
            <>
              <CustomInput
                fullWidth
                multiline
                type="text"
                size="small"
                value={phone}
                onChange={handleChangePhone}
              />
              <RowStack mt={1.5} justifyContent="flex-end">
                <CancelButton>Hủy</CancelButton>
                <SaveButton onClick={handleSavePhone}>Lưu</SaveButton>
              </RowStack>
            </>
          ) : (
            <TextContent>{phone}</TextContent>
          )}
        </Box>

        <CustomDivider />

        <Box>
          <RowStack mb={1}>
            <Title>Địa chỉ</Title>
            <IconButton
              sx={{ ml: 'auto' }}
              size="small"
              onClick={handleEditAddress}
            >
              <Edit />
            </IconButton>
          </RowStack>
          {isEditAddress ? (
            <>
              <CustomInput
                fullWidth
                multiline
                type="text"
                size="small"
                value={address}
                onChange={handleChangeAddress}
              />
              <RowStack mt={1.5} justifyContent="flex-end">
                <CancelButton>Hủy</CancelButton>
                <SaveButton onClick={handleSaveAddress}>Lưu</SaveButton>
              </RowStack>
            </>
          ) : (
            <TextContent>{address}</TextContent>
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default Profile;
