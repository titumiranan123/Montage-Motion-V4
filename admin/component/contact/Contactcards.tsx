"use client";
import { Contact } from '@/interface/interface';
import React from 'react';
import { api_url } from '@/hook/Apiurl';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { CalendarDays, Mail, Trash2 } from 'lucide-react';

interface ContactCardProps {
  contact: Contact;
  page: number;
  onDeleted?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, page, onDeleted }) => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Delete this message?',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete',
    });
    if (!result.isConfirmed) return;

    try {
      setIsDeleting(true);
      await api_url.delete(`/api/contacts/${contact.id}`);
      queryClient.setQueryData<Contact[]>(['contacts', page, 6], (current = []) =>
        current.filter((item) => item.id !== contact.id),
      );
      await queryClient.invalidateQueries({ queryKey: ['contacts'] });
      onDeleted?.();
      await Swal.fire({ title: 'Deleted', icon: 'success', timer: 1400, showConfirmButton: false });
    } catch (error) {
      console.error(error);
      await Swal.fire({ title: 'Error', text: 'Could not delete this message.', icon: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-md transition-all duration-300 hover:border-[#1FB5DD]/40 hover:shadow-[#1FB5DD]/10">
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold text-white">{contact.name}</h2>
            <p className={`mt-1 flex items-center gap-2 text-sm ${isValidEmail(contact.email) ? 'text-[#1CC0D3]' : 'text-red-300'}`}>
              <Mail size={15} />
              {isValidEmail(contact.email) ? (
                <a href={`mailto:${contact.email}`} className="truncate hover:underline">
                  {contact.email}
                </a>
              ) : (
                <span className="italic">Invalid email format</span>
              )}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
            <CalendarDays size={14} />
            <span>
              {formatDate(contact.created_at)}
            </span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 font-medium text-red-300 transition-colors hover:bg-red-500/20 disabled:cursor-wait disabled:opacity-50"
            >
              <Trash2 size={14} />
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        <div className="mb-5 flex-1 rounded-xl border border-[#1FB5DD]/20 bg-[#1FB5DD]/10 p-4">
          <h3 className="mb-2 text-xs font-semibold tracking-wider text-[#1FB5DD]">MESSAGE</h3>
          <p className="whitespace-pre-line text-[15px] leading-7 text-white">{contact.message}</p>
        </div>

        <div className="flex justify-end border-t border-white/10 pt-3 text-xs text-gray-500">
          <span>Updated: {formatDate(contact.updated_at)}</span>
        </div>
      </div>
    </article>
  );
};

export default ContactCard;
