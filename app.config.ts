export default defineAppConfig({
    // configuração do design
    dropdownMenu: {
        variants: {
            color: {
              primary: '',
              secondary: '',
              success: '',
              info: '',
              warning: '',
              error: '',
              neutral: ''
            },
            size: {
                xs: {
                  label: 'p-1 text-xs gap-1',
                  item: 'p-1 text-xs gap-1',
                  itemLeadingIcon: 'size-4',
                  itemLeadingAvatarSize: '3xs',
                  itemTrailingIcon: 'size-4',
                  itemTrailingKbds: 'gap-0.5',
                  itemTrailingKbdsSize: 'sm'
                },
                sm: {
                  label: 'p-1.5 text-xs gap-1.5',
                  item: 'p-1.5 text-xs gap-1.5',
                  itemLeadingIcon: 'size-4',
                  itemLeadingAvatarSize: '3xs',
                  itemTrailingIcon: 'size-4',
                  itemTrailingKbds: 'gap-0.5',
                  itemTrailingKbdsSize: 'sm'
                },
                md: {
                  label: 'p-1.5 text-sm gap-1.5',
                  item: 'p-1.5 text-sm gap-1.5',
                  itemLeadingIcon: 'size-5',
                  itemLeadingAvatarSize: '2xs',
                  itemTrailingIcon: 'size-5',
                  itemTrailingKbds: 'gap-0.5',
                  itemTrailingKbdsSize: 'md'
                },
                lg: {
                  label: 'p-2 text-sm gap-2',
                  item: 'p-2 text-sm gap-2',
                  itemLeadingIcon: 'size-5',
                  itemLeadingAvatarSize: '2xs',
                  itemTrailingIcon: 'size-5',
                  itemTrailingKbds: 'gap-1',
                  itemTrailingKbdsSize: 'md'
                },
                xl: {
                  label: 'p-2 text-base gap-2',
                  item: 'p-2 text-base gap-2',
                  itemLeadingIcon: 'size-6',
                  itemLeadingAvatarSize: 'xs',
                  itemTrailingIcon: 'size-6',
                  itemTrailingKbds: 'gap-1',
                  itemTrailingKbdsSize: 'lg'
                }
            }
        },
    }
})