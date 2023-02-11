import { Add, CancelOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  ListItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AppText from '../../components/AppText/AppText';
import Title from '../../components/Title';
import { selectTags, Tag } from '../../redux/slices/postSlice';
import { Input } from '../LoginPage/styled';
import { RowStack, SaveButton } from '../../components/Profile';

const AdminTags: React.FC = () => {
  const tagsList = useSelector(selectTags);
  const [tags, setTags] = useState<Tag[]>(tagsList);
  const [open, setOpen] = useState<boolean>(false);
  const [tag, setTag] = useState<Tag>({
    id: NaN,
    tag_name: '',
  });
  const [errorTag, setErrorTag] = useState<boolean>(false);

  const handleAdd = (tag: Tag) => () => {
    setTags((prev: Tag[]) => [...prev, tag]);
  };

  const handleDelete = (tag: Tag) => () => {
    setTags((tags: Tag[]) => tags.filter((t) => t.id !== tag.id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: any) => {
    setTag({
      id: tags.length + 1,
      tag_name: e.target.value,
    });
  };

  const handleSaveTag = () => {
    if (tag.tag_name === '') {
      setErrorTag(true);
      return;
    }
    toast.success('Tạo tag thành công');
    handleAdd(tag)();
    handleClose();
    setTag({
      id: NaN,
      tag_name: '',
    });
  };

  useEffect(() => {
    setErrorTag(false);
  }, [tag]);

  return (
    <>
      <Box m="20px">
        <Title title="Quản lý tags" />
        <Stack pt={4} pr={3} alignItems="flex-end">
          <Button
            sx={{
              textTransform: 'none',
            }}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Tạo tag mới
          </Button>
        </Stack>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 24,
          }}
        >
          Các tags hiện có
        </Typography>
        <Paper
          sx={{
            display: tags.length ? 'flex' : 'none',
            flexWrap: 'wrap',
            listStyle: 'none',
            border: '1px solid #e2e8f0',
            p: '16px 4px',
            m: '16px 0 0',
          }}
          component="ul"
        >
          {tags.map((tag) => {
            return (
              <ListItem
                key={tag.id}
                sx={{
                  width: 'fit-content',
                  p: 1,
                }}
              >
                <Chip
                  label={tag.tag_name}
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onDelete={handleDelete(tag)}
                />
              </ListItem>
            );
          })}
        </Paper>
      </Box>

      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            minWidth: 800,
            bgcolor: '#fff',
            borderRadius: 5,
            padding: '32px 47px 34px 59px',
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
          size="small"
          onClick={handleClose}
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
          Tạo tag mới
        </Typography>

        <Input
          size="small"
          type="email"
          fullWidth
          placeholder="Nhập tên tag"
          value={tag.tag_name}
          onChange={handleChange}
          sx={{
            my: 3,
          }}
        />

        {errorTag && (
          <AppText
            style={{
              color: 'red',
              fontSize: '12px',
              textAlign: 'left',
              margin: '0 0 5px 10px',
            }}
            role="alert"
          >
            Bạn chưa nhập tên tag
          </AppText>
        )}

        <RowStack mt={1.5} justifyContent="flex-end">
          <SaveButton onClick={handleSaveTag}>Lưu</SaveButton>
        </RowStack>
      </Dialog>
    </>
  );
};

export default AdminTags;
